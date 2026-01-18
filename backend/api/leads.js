module.exports = (app) => {
  const getId = async (req, res) => {
    const leadId = req.body.entry[0].changes[0].value.leadgen_id;

    await app
      .db("leads")
      .insert({
        external_lead_id: leadId,
        status: "pending",
        source: "facebook_ads",
      });

    fetchAndProcessLead(leadId);

    res.status(200).send("EVENT_RECEIVED");
  };

  const fetchAndProcessLead = async (leadId) => {
    const token = process.env.FB_PAGE_TOKEN;
    const url = `https://graph.facebook.com/v20.0/${leadId}?access_token=${token}`;

    try {
      const response = await app.axios.get(url);
      const { name, email } = response.data;
    } catch (error) {
      console.error(`Erro ao buscar dados na Marketing API ${error}`);
    }
  };

  const listenId = (req, res) => {
    const VERIFY_TOKEN = process.env.FB_AUTHTOKEN;

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK verificado com sucesso!");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  };

  return {
    getId,
    listenId,
  };
};
