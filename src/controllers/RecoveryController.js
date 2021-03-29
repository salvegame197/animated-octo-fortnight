import crypto from 'crypto';
import { addMinutes, isAfter } from 'date-fns';
import User from '../models/user';
import Mail from '../lib/Mail';
import mailConfig from '../config/mail';

class RecoveryController {
  async store(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        console.warn(
          `IP:${req.ip} POST/recevory user does not found : ${email}`
        );
        return res.status(400).json({ error: 'User does not found' });
      }
      const token = await crypto.randomBytes(8).toString('hex');
      const exp = addMinutes(new Date(), 5);

      user.token = token;
      user.expiration = exp;

      Mail.sendMail({
        from: mailConfig.from,
        to: user.email,
        subject: 'Recuperação de senha',
        template: 'recovery',
        context: {
          token: user.token,
        },
      });

      await user.save();
      console.info(`IP:${req.ip} POST/recovery send mail to  : ${user.email}`);
      return res.status(200).send();
    } catch (error) {
      console.error(`IP:${req.ip} POST/recovery : ${error}`);
      return res.status(400).json({ error: 'Error to send email' });
    }
  }

  async update(req, res) {
    try {
      const { token, password } = req.body;

      const user = await User.findOne({ token });
      if (isAfter(new Date(), user.expiration)) {
        console.error(`IP:${req.ip} PUT/recovery Token expired ${token}`);
        return res.status(400).json({ error: 'Token expired' });
      }

      user.password = password;
      user.token = null;
      user.expiration = null;
      await user.save();

      console.info(`IP:${req.ip} PUT/recovery : ${user}`);
      return res.status(200).send();
    } catch (error) {
      console.error(`IP:${req.ip} POST/recovery : ${error}`);
      return res.status(400).json({ error: 'Error at update password' });
    }
  }
}

export default new RecoveryController();
