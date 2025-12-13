function status(request, response) {
  response
    .status(200)
    .json({ message: "Curso.dev studens are above-average people" });
}

export default status;
