/**
 * namedavatar API
 * @module namedavatar
 */

var AvatarImage = require('./image')
var AvatarName = require('./name')

function namedavatar() {}

/**
 * global config
 */
namedavatar.options = {
  // pick type, eg. firstNmae, lastName, initials
  nameType: 'firstName',

  // font family list
  fontFamily: 'Verdana, Geneva, sans-serif',

  // pick from https://material.io/guidelines/style/color.html#color-color-tool
  backgroundColors: [
    '#1890ff'
  ],

  // font color default white
  textColor: '#FFF',

  // font size default between 8 and 16
  minFontSize: 8,
  maxFontSize: 16,
}

/**
 * set global config
 * @param {Object} options - extended global options
 */
namedavatar.config = function(options) {
  Object.assign(this.options, options)
}

/**
 * set named avatar of imgs
 * @param {HTMLImageElement[]} imgs - <img> node list
 * @param {string} attr - attribute name, eg. alt, data-name
 */
namedavatar.setImgs = function(imgs, attr) {
  for (var i = 0; i < imgs.length; i++) {
    this.setImg(imgs[i], imgs[i].getAttribute(attr))
  }
}

/**
 * set named avatar of img
 * @param {HTMLImageElement} img - <img> node
 * @param {string} fullName - full name
 */
namedavatar.setImg = function(img, fullName) {
  var options = {}
  if (!('width' in this.options) && img.width) {
    options.width = img.width
  }

  var svg = this.getSVG(fullName, options)

  var uri = 'data:image/svg+xml,' + svg.outerHTML
  img.setAttribute('src', uri)
}

/**
 * get avatar svg node
 * @param {string} fullName - full name
 * @param {Object} extendOptions - local extended options
 * @return {HTMLElement} - <svg> node
 */
namedavatar.getSVG = function(fullName, extendOptions) {
  var options = Object.assign({}, this.options, extendOptions)

  var avatarName = new AvatarName(fullName, options)
  var name = avatarName.getName()

  var avatarImage = new AvatarImage(name, options)
  return avatarImage.createSVG()
}

module.exports = namedavatar
