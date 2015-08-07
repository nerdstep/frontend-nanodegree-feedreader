/* feedreader.js
 *
 * This spec file contains all of the tests that Jasmine
 * will  run against the application.
 */

$(function () {

  'use strict';

  describe('RSS Feeds', function () {

    /* Ensure the allFeeds array is defined and not empty
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Ensure each object in the allFeeds array has a URL defined
     * and that the URL is not empty.
     */
    it('each feed URL is defined', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    /* Ensure each object in the allFeeds array has a name defined
     * and that the name is not empty.
     */
    it('each feed Name is defined', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });

  });

  describe('The menu', function () {

    var $body = $('body');
    var $menu = $('.menu-icon-link');

    $menu.on('click', function () {
      console.log('menu clicked');
    });

    /* Ensure menu is hidden by default
     */
    it('is hidden', function () {
      expect($body.hasClass('menu-hidden')).toBe(true);
    });

    /* Ensure the menu changes visibility when the menu icon is clicked
     */
    it('changes when clicked', function () {
      $menu.trigger('click');
      expect($body.hasClass('menu-hidden')).toBe(false);

      $menu.trigger('click');
      expect($body.hasClass('menu-hidden')).toBe(true);
    });

  });

  describe('Initial Entries', function () {

    beforeEach(function (done) {
      loadFeed(0, done);
    });

    /* Ensure that when the loadFeed is called, there is at least
     * a single .entry element within the .feed container.
     */
    it('has at least one .entry', function (done) {
      var $feed = $('.feed');
      var $entries = $feed.find('.entry');
      expect($feed.length).not.toBe(0);
      expect($entries.length).toBeGreaterThan(0);
      done();
    });

  });

  describe('New Feed Selection', function () {
    var $feed = $('.feed');
    var heading1;
    var heading2;

    beforeEach(function (done) {
      // load the first feed and get the heading of the first entry
      loadFeed(0, function () {
        heading1 = $feed.find('h2:first').text();

        // load the second feed and get the heading of the first entry
        // call done callback after the second feed has loaded
        loadFeed(1, function () {
          heading2 = $feed.find('h2:first').text();
          done();
        });
      });
    });

    /* Ensure that when a new feed is loaded that the content actually changes
     */
    it('has new content', function () {
      console.log(heading1, heading2);
      expect(heading1).not.toEqual(heading2);
    });

  });

  /* Test each feed to ensure it loads without error
   */
  describe('All feeds load', function () {

    allFeeds.forEach(function (feed, i) {
      it('load ' + feed.name, function (done) {
        loadFeed(i, function (result) {
          expect(result.error).not.toBeDefined();
          done();
        }, true);
      });
    });

  });

}());
