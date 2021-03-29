class UserController {
  index(req, res) {
    res.json({
      rr: 'Hello',
    });
  }
}

export default new UserController();
