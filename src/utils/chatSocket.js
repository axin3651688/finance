let stompClient=()=>{
    
};
export default {
    init: function(url) {
        stompClient = Stomp.over(new SockJS(url));
    },
    connect: (header,successCallback, errorCallback)=>{
        stompClient.connect(header, (frame)=> {
            successCallback(frame);
        },(error)=>{
            errorCallback(error);
        });
    },
    subscribe : function(destination, callback) {
        stompClient.subscribe(destination, function(message) {
            callback(message);
        });	
    },
    send: function(destination, headers, object) {
        stompClient.send(destination, headers, object);
    }
}