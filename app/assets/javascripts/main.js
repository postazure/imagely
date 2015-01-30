$(document).ready(function () {
  $("input[type='submit']").on('click', function (e) {
    e.preventDefault();
    createImage({
      url: $("#image_url").val(),
      title: $("#image_title").val(),
      username: $("#image_username").val()
    });
  });

  $('#image-region').on('click', '.delete-image', function () {
    deleteImage($(this));
  });

  $('#image-region').on('click', '.heart', function () {
    likeImage($(this));
  });
});

function createImage(paramsHash) {
  $.ajax("/images",{type: "post", data:{image:paramsHash}})
  .done(function (image) {
    clearImageFields();

    $("#image-region").append(
      "<div class='image-holder' data-id="+image.id+">"+
        "<img alt='Delete icon md' class='delete-image' src='/assets/delete-icon-md.png'>"+
        "<img class='thumbnail' src="+ image.url +" alt="+ image.title +"/>"+
        "<div class='plaque'>"+
          "<h3>"+ image.title +"</h3>"+
          "<p>"+ image.username +" | <i class='heart icon'>"+ image.likes +"</i></p>"+
        "</div>"+
      "</div>"
    );
  }).fail(function (data) {
    printErrors(data);
  });
}

function deleteImage(currentSpan) {
  var id = currentSpan.parent().data("id");
  $.ajax("/images/"+id, {type: "delete"})
  .done(function (data) {
    var imageHolder = $('.image-holder[data-id="'+data.id+'"]');
    imageHolder.fadeOut('fast',function () {
        this.remove();
      });
  }).fail(function (data) {
    console.log("failed to delete");
  });
}

function likeImage(currentIcon) {
  var id = currentIcon.closest(".image-holder").data("id");
  var likes = parseInt(currentIcon.text());
  $.ajax("/images/"+id, {type: 'patch',
    data:{update_command:"likes"}
  })
  .done(function (data) {
    currentIcon.text(data.likes);
  }).fail(function (data) {
    console.log("failed to like");
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
