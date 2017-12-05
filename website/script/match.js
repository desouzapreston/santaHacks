/* The following example list two objects in a bucket. */
var sourceBucket = "responses.santahacks.com";
var urlParams = new URLSearchParams(window.location.search);
var prefixValue = urlParams.get("orgname");

var params = {
  Bucket: sourceBucket,
  Prefix: prefixValue
};

var people;

s3.listObjects(params, function (err, data) {
  if (err)
    console.log(err, err.stack); // an error occurred
  else {
    people = data.Contents;
  }
});
setTimeout(function () {
  people = assignSantas(people);
  for (var i = 0; i < people.length; i++) {
    var santaKey = people[i].santa.Key;
    var elfKey = people[i].recipient.Key;
    var santa = santaKey.slice(santaKey.indexOf("/") + 1, santaKey.indexOf(".json"));
    var elf = elfKey.slice(elfKey.indexOf("/") + 1, elfKey.indexOf(".json"));
    console.log("Santa: " + santa + " Elf: " + elf);
  }
}, 500);

//Begin match
function assignSantas(array) {
  var matches = [];

  if (!array || !array.length) {
    return null;
  }

  var santas = array.slice();
  shuffle(santas);

  for (var i = 0; i < santas.length; i++) {
    var santa = santas[i],
      recipient;

    // Assign santa to the person next to them to avoid assigning to self and avoid duplicate recipients
    if (i !== santas.length - 1) {
      recipient = santas[i + 1];
    } else {
      recipient = santas[0];
    }

    matches.push({
      "santa": santa,
      "recipient": recipient
    });
  }

  return matches;
};

function shuffle(array) {
  var n = array.length,
    i,
    j;

  while (n) {
    i = Math.floor(Math.random() * n--);

    j = array[n];
    array[n] = array[i];
    array[i] = j;
  }
}

function parseNames(value) {
  var names = [];
  var vals = value.split('\n');

  for (var i = 0; i < vals.length; i++) {
    var name = vals[i].trim();
    if (name === '') continue;
    names.push(name);
  }
  return names;
}