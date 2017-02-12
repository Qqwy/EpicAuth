# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
console.log("DERP")

$ ->
  $('#bithug_login').on 'click', ->
    console.log(this)
    $('#classic_login').fadeOut 1500, ->
      $('#classic_login').remove()
      $('.ui.centered.two.column.grid').removeClass('two').addClass('one')
      $('.login-with-epicauth').addClass('')
