$(document).ready(function() {

    var key = 'AIzaSyDSzXd8TulEEIzhYPORbuWfSYnXn-7UYsY';
    var URL = 'https://www.googleapis.com/youtube/v3/search';
    var channelIds = ['UCtinbF-Q-fVthA0qrFQTgXQ', 'UCmh5gdwCx6lN7gEC20leNVA', 'UCCI_8nSz_TYWWaXMV475c9Q', 'UCiIFLzjBUX5WpkVqVDVWMTQ', 'UCptRmkkO5t2wGbF2qyjaMCA', 'UCJRb6jaNxNjkLfVg_z8VQ3g', 'UCfp86n--4JvqKbunwSI2lYQ', 'UCuTQDPUE12sy7g1xf1LAdTA', 'UCvK4bOhULCpmLabd2pDMtnA'];
    //       Faze Rain                    Jarvis Johnson                Orlando                     BCC Trolling                Pewdiepie
    // 'UCxaVOVnhmT0-HCUv72jtOTA', 'UCoLUji8TYrgDy74_iiazvYA', 'UCTj5CwWRyK7S6siyavfPSMQ', 'UCBw-Dz6wHRkxiXKCLoWqDzA', 'UC-lHJZR3Gqxm24_Vd_AJ5Yw'
    var channelURL = 'https://www.googleapis.com/youtube/v3/channels';
    
    loadVideos(channelIds[0]);
    
    function loadVideos(channelId) {
        var options = {
            part: 'snippet',
            key: key,
            maxResults: 50,
            channelId: channelId,
            order: 'date'
        }
        
        $.getJSON(URL, options, function(data){
            var id = data.items[0].id.videoId;
            mainVideo(id);
            resultsLoop(data);
        });
    }
    
    loadChannels();
    
    function loadChannels() {
        $.each(channelIds, function(i, channel) {
            var options = {
                part: 'snippet',
                key: key,
                maxResults: 10,
                id: channel
            }
            $.getJSON(channelURL, options, function(data){
                channelLoop(data);
            });
        });
    }
    
    function channelLoop(data) {
        var id = data.items[0].id;
        var title = data.items[0].snippet.title;
        var picture = data.items[0].snippet.thumbnails.medium.url;
        if (id == 'UCtinbF-Q-fVthA0qrFQTgXQ') {
            $('.channelInfo').append(`
                <li class='active' data-key="${id}"><a href="#"><img src="${picture}" alt="profile picture" class="profilePic"> ${title}</a></li>
            `);
        } else {
            $('.channelInfo').append(`
                <li data-key="${id}"><a href="#"><img src="${picture}" alt="profile picture" class="profilePic"> ${title}</a></li>
            `);
        }
    }
    
    function mainVideo(id) {
        $('#video').html(`
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);
    }
    
    function resultsLoop(data) {
        $('main').html('');
        $.each(data.items, function(i, item) {
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.id.videoId;
            
            $('main').append(`
            <article class="item" data-key="${vid}">
                <img src="${thumb}" alt="thumbnail for video" class="thumb">
                <div class="details">
                    <h4>${title}</h4>
                    <p>${desc}</p>
                </div>
            </article>
            `);
        });
    }
    
    $('main').on('click', 'article', function() {
        var id = $(this).attr('data-key');
        
        $(this).css('background-color', '#eee');
        
        mainVideo(id);
    });
    
    $('.channelInfo').on('click', 'li', function() {
        var id = $(this).attr('data-key');
        
        $('li').removeClass('active');
        
        $(this).addClass('active');
        
        loadVideos(id);
    });
});