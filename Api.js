const axios = require("axios");
const fs = require("fs");
const input = require("readline-sync");

var arr = [];
axios
  .get("https://saral.navgurukul.org/api/courses")
  .then((response) => {
    fs.writeFileSync("mainData.json", JSON.stringify(response.data, null, 4));

    var ut = response.data;
    var op = 1;
    for (const item of ut["availableCourses"]) {
      arr.push(item["id"]);
      console.log(op + ")", item["name"]);
      op++;
    }

    const user = input.questionInt("Enter Youe Choise :--");

    axios
      .get(`https://saral.navgurukul.org/api/courses/74/exercises`)
      .then((res) => {
        fs.writeFileSync("firstData.json", JSON.stringify(res.data, null, 4));
        var j = res.data;

        var m = 1;
        const dict = {};
        for (var se of j["data"]) {
          console.log(m + ")", se["name"]);
          dict[m] = se["slug"];
          m++;
        }

        var us = input.question("enter you num :-");
        axios
          .get(
            `https://saral.navgurukul.org/api/courses/74/exercise/getBySlug?slug=${dict[us]}`
          )
          .then((d) => {
            fs.writeFileSync(
              "secondData.json",
              JSON.stringify(d.data, null, 4)
            );

            var mq = d.data;
            // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
            // console.log(typeof(mq));
            console.log(mq["content"]);

          });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err.massage);
  });
