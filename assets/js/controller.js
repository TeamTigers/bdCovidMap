$(function () {
  $('select').formSelect();

  let apiURL = "https://corona-bd.herokuapp.com/district";
  $.get(apiURL, function () {})
    .done(function (res) {
      let districtData = res.data;
      setBtnData(res);
      setMapColor(districtData);
      changeData(districtData);
      //setMapData(districtData);
      $('#lastUpdate').text("Last update on : " + res.updated_on);
    })
    .fail(function () {
      console.log("Internal Problem!!!");
    });
});

function setMapColor(districtData) {
  //console.log(districtData);
  for (let i = 0; i < districtData.length; i++) {
    let disName = districtData[i];
    let data = mapData.find(el => el.name === disName);
    console.log(data);
  }
}

function setBtnData(res) {
  let pages = Math.ceil(res.data.length / 10);

  let btnStr = "<ul class='pagination'>";

  for (let i = 1; i <= pages; i++) {
    btnStr += "<li class='waves-effect'><a class='commonClass' id='"+ i +"'"
    btnStr += ">" + i + "</a></li>"
  }
  btnStr += "</ul>";
  makeTable(res.data, 1);
  $("#disTableBtn").html(btnStr);
}

function changeData(data) {
  $(".commonClass").click(function () {
    let pageNum = this.id;
    //$('#' + pageNum).css({ "background-color": "blue" });
    makeTable(data, pageNum);
  });
}

function makeTable(data, pageNum) {
  let tableStr = "<table>";
  tableStr +="<thead><tr><th><strong>District</strong></th><th>";
  tableStr += "<strong>Today</strong><th><strong>Last-Day</strong>";
  tableStr += "</th></th></tr></thead><tbody>";

  let currentNum = pageNum * 10;
  for (let i = currentNum - 10; i < Math.min(currentNum, data.length); i++) {
    tableStr += "<tr><td>" + data[i].name + "</td>";
    tableStr += "<td>" + data[i].count + "</td>";
    tableStr += "<td>" + data[i].prev_count + "</td></tr>";
  }
  tableStr += "</tbody></table>";
  $("#disTable").html(tableStr);
}

function setMapData(districtData) {
  console.log(districtData);

  $("a").on("click", function () {
    let districtId = $(this).data("id");
    let districtName = $(this).data("value");
    if (districtName === "Dhaka") districtName = "Dhaka (District)";
    if (districtName === "Coxs Bazar") districtName = "Cox's bazar";
    let selectedDistrict = districtData.find((o) => o.name === districtName);

    console.log(selectedDistrict);
    console.log(districtId);
    console.log(districtName);
    let msg = `${districtName} has ${selectedDistrict.count} infected cases.`;
    setModal(msg);
    // $("#myId").text(districtName + " " + selectedDistrict.count + " infected.");
  });
}