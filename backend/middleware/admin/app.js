const sql = require("../../database");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arnavpragya04@gmail.com",
    pass: "vblvyiidxzdlzhve",
  },
});

const selectTeam = (id, email, res) => {
  if (id === "" || id === undefined || id === null)
    res.status(401).send({ message: "Invalid id" });
  else {
    sql.query(
      "UPDATE application SET status='Selected' WHERE id='" + id + "'",
      (error, result) => {
        if (error) {
          res
            .status(500)
            .send({ message: "Something went wrong", error: error });
          console.log(error);
        } else res.status(200).send({ result: result });
      }
    );
    const mail = {
      from: "arnavpragya04@gmail.com",
      to: email,
      subject: "Application successful!",
      html: `<div>
              <p>We are happy to say that your application has been successful and have progressed to the next stage of the competition.</p>
              <p>You will receive another mail regarding the next step for the event.</p>
              <br />
              <p>Best regards</p>
              <p>Open Challenge Programme Team</p>
            </div>`,
    };

    transporter.sendMail(mail, (error) => {
      if (!error) {
        console.log("Mail sent successfully!");
      } else {
        console.log("Error: " + error);
      }
    });
  }
};
const rejectTeam = (id, email, res) => {
  if (id === "" || id === undefined || id === null)
    res.status(401).send({ message: "Invalid id" });
  else {
    sql.query(
      "UPDATE application SET status='Rejected' WHERE id='" + id + "'",
      (error, result) => {
        if (error)
          res
            .status(500)
            .send({ message: "Something went wrong", error: error });
        else res.status(200).send({ result: result });
      }
    );

    const mail = {
      from: "arnavpragya04@gmail.com",
      to: email,
      subject: "Application unsuccessful!",
      html: `<div>
              <p>We are unhappy to say that your application has been unsuccessful. We have decided to move on
              with others due to tough competition for the seats</p>
              <br />
              <p>Best regards</p>
              <p>Open Challenge Programme Team</p>
            </div>`,
    };

    transporter.sendMail(mail, (error) => {
      if (!error) {
        console.log("Mail sent successfully!");
      } else {
        console.log("Error: " + error);
      }
    });
  }
};

const deleteApplication = (id, res) => {
  if (id === "" || id === null || id === undefined)
    res.status(401).send({ message: "Invalid id" });
  else {
    sql.query(
      "DELETE FROM application WHERE id='" + id + "'",
      (error, result) => {
        if (error)
          res
            .status(500)
            .send({ message: "Something went wrong", error: error });
        else res.status(200).send({ result: result });
      }
    );
  }
};

module.exports = { selectTeam, rejectTeam, deleteApplication };
