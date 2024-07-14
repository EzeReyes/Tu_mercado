
const sobreGet = (req, res) => {
    const data = {}; // Aquí puedes agregar los datos que necesites pasar a la vista
    res.render('pages/sobreNosotros', data)
}

module.exports = {
    sobreGet
}