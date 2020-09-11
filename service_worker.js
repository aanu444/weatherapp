const cacheName='v1';
const cacheAssets=[
    'index.html',
    'index.css',
    'main.js',
    'manifest.json'
];

//Call Install Event

self.addEventListener("install", function(event){
    console.log("Service Worker: Installed");

    event.waitUntil(
        caches
        .open(cacheName)
        .then(function(cache){
            console.log("Service Worker: Caching Files");
            cache.addAll(cacheAssets);
        }).then(function(){
            self.skipWaiting();
        })
    );
});


//Call Activate Event
self.addEventListener("activate", function(event){
    console.log("Service Worker: Activated");
    //I am removing unwanted caches now
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames){
            return Promise.all(
                cacheNames
                .map(function(cache){
                    if(cache !== cacheName){
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            )
            })
        )
    
});

//Call Fetch Event
self.addEventListener("fetch", function(event){
    console.log("Service Worker:Fetching");

    event.respondWith(
        fetch(event.request).catch(function(){
            caches.match(event.request);
        })
    )
});