var jsonData = {};
var turndown = new TurndownService();
$(".accordion table").each(function () {
  var modlist = [];
  $(this).find("tr").each(function () {
    let mod = {};
    let titleElem = $(this).find("td.col2>a");
    let descElem = $(this).find("td.col3");
    mod["name"] = titleElem.text().replace(/\s*\n\s*/g, " ");
    mod["url"] = titleElem.attr("href");
    mod["flags"] = [];
    if (descElem.html()) {
      mod["desc"] = turndown.turndown(descElem.html());
    } else {
      mod["desc"] = "";
    }
    // Flag time
    if (mod["desc"].includes("DG")) {
      mod["flags"].push(1);
    }
    if (mod["desc"].includes("HF")) {
      mod["flags"].push(2);
    }
    if (mod["desc"].includes("DB")) {
      mod["flags"].push(3);
    }
    if (mod["desc"].includes("SKSE")) {
      mod["flags"].push(4);
    }
    if ($(this).attr("class") && $(this).attr("class").includes("group")) {
      mod["flags"].push(5);
    }
    modlist.push(mod);
  })
  let section = $($(this).parents("div.new")[0]).find("h5.h a").text();
  jsonData[section] = modlist;
});