const response = {
  success: (res, data, message) => {
    const response1 = {
      succes: true,
      data,
      code: 200,
      message,
    };
    res.json(response1);
  },
  failed: (res, code, err) => {
    if (code === 500) {
      const response1 = {
        succes: false,
        data: null,
        code,
        message: `500 internal server error${err}`,
      };
      res.status(401).json(response1);
    } else if (code === 401) {
      const response1 = {
        succes: false,
        data: null,
        code,
        message: `401 Unauthorized${err}`,
      };
      res.status(401).json(response1);
    } else if (code === 100) {
      const response1 = {
        succes: false,
        data: null,
        code,
        message: err,
      };
      res.status(401).json(response1);
    } else if (code === 10) {
      const response1 = {
        succes: false,
        data: null,
        code,
        message: err,
      };
      res.status(401).json(response1);
    }
  },
};

module.exports = response;
