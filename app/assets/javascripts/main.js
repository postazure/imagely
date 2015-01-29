$(document).ready(function () {
  $("input[type='submit']").on('click', function (e) {
    e.preventDefault();
    createImage({
      url: $("#image_url").val(),
      title: $("#image_title").val(),
      username: $("#image_username").val()
    });
  });

  $('.delete-image').on('click', function () {
    deleteImage($(this));
  });
});

function createImage(paramsHash) {
  $.ajax("/images",{type: "post", data:{image:paramsHash}})
  .done(function (image) {
    clearImageFields();

    $("#image-region").append(
      "<div class='image-holder'>"+
        "<img class='thumbnail' src="+ image.url +" alt="+ image.title +"/>"+
        "<div class='plaque'>"+
          "<h3>\""+ image.title +"\"</h3>"+
          "<p>Posted by:"+ image.username +"</p>"+
        "</div>"+
      "</div>"
    );
  }).fail(function (data) {
    printErrors(data);
  });
}

function deleteImage() {
  // Need to get id info
  $.ajax("/images", {type: "delete"})
  .done(function (data) {

  }).fail(function (data) {
    // body...
  });
}

function clearImageFields() {
  $("#image_url").val("");
  $("#image_title").val("");
  $("#image_username").val("");
  $("#image_url").removeClass("error-field");
  $("#image_title").removeClass("error-field");
  $("#image_username").removeClass("error-field");
  $("#flash-message").empty();
}


function printErrors(responseHash) {
  $("#flash-message").empty();
  var errors = JSON.parse(responseHash.responseText);
  if (errors.title !== undefined) {
    $("#image_title").addClass("error-field")
    for (var i = 0; i < errors.title.length; i++) {
      $("#flash-message").append("<strong>Title: </strong>"+ errors.title[i] +". ");
    }
  }
  if (errors.url !== undefined) {
    $("#image_url").addClass("error-field")
    for (var i = 0; i < errors.url.length; i++) {
      $("#flash-message").append("<strong>Image Url: </strong>"+ errors.url[i] +". ");
    }
  }
  if (errors.username !== undefined) {
    $("#image_username").addClass("error-field")
    for (var i = 0; i < errors.username.length; i++) {
      $("#flash-message").append("<strong>Username: </strong>"+ errors.username[i] +". ");
    }
  }
}
