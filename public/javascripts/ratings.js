/*global $*/
$(document).ready(function() {
  var Dict = {};
  $("#postComment").click(function() {
    var myobj = {
      Name: $("#name").val(),
      Comment: $("#comment").val(),
      Image: $("#imageLink").val(),
      Type: $("#genre").val()
    };
    var jobj = JSON.stringify(myobj);
    $("#json").text(jobj);
    var url = "comment";
    $.ajax({
      url: url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        $("#done").html(textStatus);
      }
    });
  });
  $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<h1>Comments Matrix</h1> <br>";
      for (var comment in data) {
        var com = data[comment];
        if (Dict[com.Name]) {
          Dict[com.Name].push(com);
        }
        else {
          Dict[com.Name] = [com];
        }
      }
      console.log(Dict);
      for (var comment in Dict) {
        console.log("comment", comment);
        com = Dict[comment];
        console.log(com);
        everything += "Name: " + comment;
        for (var data in com) {
          console.log(data);
          var dat = com[data];
          everything += " -- Comment: " + dat.Comment + "<br>";
          everything += "Image Link: " + dat.Image + "<br>";
          everything += "Type of Food: " + dat.Type + "<br>";
        }
        
      }
      $("#comments").html(everything);
    });
  });
  $("#deleteComments").click(function() {
    console.log("you clicked delete");
    $.ajax({
      url: "comment",
      type: "DELETE",
      success: function(data, textStatus) {
        alert("Delete was " + textStatus);
        $('#comments').html("");
      }
    });

  });
  $("#searchRest").click(function(event) {
    event.preventDefault();
    var name = $("#query").val();
    var URL = "comment?q=" + name;
    console.log(URL);
    $.getJSON(URL, function(data) {
      console.log(data);
      var userCom = "<h1>Comments Matrix</h1> <br>";
      userCom += name;
      for (var comment in data) {
        var com = data[comment];
        userCom += "Comment: " + com.Comment + "<br>";
        userCom += "Image Link: " + com.Image + "<br>";
        userCom += "Type of Food: " + com.Type + "<br>";
      }
      $("#comments").html(userCom);
    });
  });
});
