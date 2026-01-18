module.exports = app => {
    app.route('/webhooks/facebook')
        .post(app.api.leads.getId)
        .get(app.api.leads.listenId)
}