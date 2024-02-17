$(document).ready(function(){
  $('.delete-record').on('click', function(e){
    $('#delete-modal form').attr('action', $(this).data('delete-url'));
  });
})