class HomeController {
  index(req, res) {
    res.json({
      rr: 'Hello',
    });
  }
}

export default new HomeController();
