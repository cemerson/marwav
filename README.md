# Horribly out of date/buggy atm ... :( 


MARWAV! (ALPHA)
======

The multiple aspect ratio web app viewer. 

This is just a hack/means of viewing a local or online web app in an assortment of device sizes all at once on one browser (Chrome) page to avoid hitting ALT-TAB a million times a day. There are various Chrome extensions that let you view a site in a specifically-sized browser window, but I wanted a page that let me view and fix multiple devices at the same time. In a perfect world I'd have preferred to use some magic mirroring technology to keep the page load/CPU burden lighter - but for now this is really just a glorified stack of iframe windows.

## Usage
- Grab the marwav.html or just make a bookmark to here to try it out: http://rawgithub.com/cemerson/marwav/master/marwav.html 
- Note: file:/// links won't work unless you're viewing the marwav.html file locally

## Current device sizes integrated:
  - iPad
  - iPhone 3GS
  - iPhone 5
  - Nexus One
  - Galaxy Nexus
  - Galaxy S 3/4

## Other Notes
 - Can use http:// or file:/// URLs
 - Works great with [Chrome DevTools Autosave](https://github.com/NV/chrome-devtools-autosave) :) 
 - Uses RawGitHub.com to link to the source JS/CSS files (so you only need the html file for now).
 - After first use the URL, scale and device checkbox settings will be saved to and loaded from localStorage
 - This thing does have capacity to eat up fair amount of RAM/CPU - but most modern dev machines should be fine
 - The "Rotate" button is very basic - may quirk out sometimes.
 - The "Scale" pulldown/feature is pretty buggy. My advice - only use if you feel like trying to finish/fix the feature.

Consider this thing in super alpha state! A developer testing tool only for now ...

## Screenshots

![Screenshot 1](http://farm8.staticflickr.com/7442/9615146672_160a14da2e_c.jpg)

![Screenshot 2](http://farm6.staticflickr.com/5550/9615146788_7159540269_c.jpg)

Request!
======
If anyone knows of something more fleshed-out/formal that does this same kind of thing please post a comment in the Issues area to let me know (or ping me on Twitter @emerson_chris). Thanks
