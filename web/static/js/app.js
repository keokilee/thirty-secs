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
let gifInterval
let gifs = []
let $ads = $('.ads')
let $message

loadGifs()

$(() => {
  $startButton = $('.start')
  $endButton = $('.stop')
  $message = $('#message')

  $startButton.click(handleStart)
  $endButton.click(handleEnd)

  if (window.webkitSpeechRecognition) {
    startVoiceRecognition()
  }
})

function handleStart () {
  startDate = Date.now()

  $startButton.prop('disabled', true)
  $endButton.prop('disabled', false)
  cancelled = false
  $message.html('Good luck!')
  $('#ads-title').html("While you're waiting")

  const index = Math.floor(Math.random() * gifs.length)
  $ads.html(`<img src="${gifs[index]}" />`)

  gifInterval = setInterval(() => {
    const index = Math.floor(Math.random() * gifs.length)
    $ads.html(`<img src="${gifs[index]}" />`)
  }, Math.floor(Math.random() * 4000) + 1000)

  xhrRequest = startAjaxRequest()
}

function startAjaxRequest () {
  return $.get('/api/ping').done(() => {
    $ads.html('')
    $('#ads-title').html('')
    clearInterval(gifInterval)
    $startButton.prop('disabled', false)
    $endButton.prop('disabled', true)
    $message.html('You went over the time limit!')
  }).fail(() => {
    $ads.html('')
    $('#ads-title').html('')
    clearInterval(gifInterval)
    $startButton.prop('disabled', false)
    $endButton.prop('disabled', true)
    if (cancelled) {
      // Take the difference between start and end
      $message.html(`Awesome! Your score: ${endDate - startDate}`)
    } else {
      $message.html('You went over the time limit!')
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
    $message.html('Good luck')
  }, 5000)
}

function loadGifs() {
  if (gifs.length === 0) {
    $.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC').done(function (response) {
      console.log(response.data)
      gifs = response.data.map(d => d.images.downsized_large.url)
    })
  }
}
