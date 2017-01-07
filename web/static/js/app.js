// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import $ from 'jquery'

let $startButton
let $endButton
let xhrRequest
let cancelled
let startDate
let endDate
let recognition
let messageInterval

$(() => {
  $startButton = $('.start')
  $endButton = $('.stop')

  $startButton.click(handleStart)
  $endButton.click(handleEnd)

  if (window.webkitSpeechRecognition) {
    startVoiceRecognition()
  }
})

function handleStart () {
  startDate = Date.now()
  $('#message').html('Good luck')

  $startButton.prop('disabled', true)
  $endButton.prop('disabled', false)
  cancelled = false

  xhrRequest = startAjaxRequest()
}

function startAjaxRequest () {
  return $.get('/api/ping').done(() => {
    $startButton.prop('disabled', false)
    $endButton.prop('disabled', true)
    $('#message').html('You went over the time limit!')
  }).fail(() => {
    $startButton.prop('disabled', false)
    $endButton.prop('disabled', true)
    if (cancelled) {
      // Take the difference between start and end
      $('#message').html(`Awesome! Your score: ${endDate - startDate}`)
    } else {
      $('#message').html('You went over the time limit!')
    }
  })
}

function handleEnd () {
  endDate = Date.now()
  cancelled = true

  xhrRequest.abort()
}

function startVoiceRecognition() {
  console.log('recognize')
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'en-US'

  recognition.onstart = function () {
    console.log('recognition start')
  }
  recognition.onresult = function(event) {
    const result = event.results[event.resultIndex][0]

    if (result.transcript.match(/start/) && $.active === 0)  {
      handleStart()
    } else if (result.transcript.match(/stop/) && $.active > 0)  {
      handleEnd()
    }
  }

  recognition.start()
}

function startMessageDisplay () {
  interval = setInterval(function () {
    $('#message').html('Good luck')
  }, 5000)
}
