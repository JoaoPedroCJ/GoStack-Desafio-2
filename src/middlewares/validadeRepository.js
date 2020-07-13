const { isUuid } = require("uuidv4");

module.exports = {
  validadeRepositoryId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: 'Invalid repository ID.' });
    }

    return next();
  }
}