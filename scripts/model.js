var app=app||{};

app.models=(function(){

    function Models(baseUrl){
        this.baseUrl=baseUrl;
        this.books=new Books(this.baseUrl)
    }

    var Requester=(function(){
        function makeRequest(method,url,data,success,error){
            $.ajax({
                method:method,
                headers:{
                    "X-Parse-Application-Id":"Or4tobWlPSud7k4RmgsXuB3lnebAW9BFqOWLiqUW",
                    "X-Parse-REST-API-Key":"o4zJA5OTIs4YNhIC5FNCx1ay6xt1WYz67ePziQIy"
                },
                url:url,
                contentType:'application/json',
                data:JSON.stringify(data),
                success:success,
                error:error
            })
        }

        function getRequest(url,success,error){
            makeRequest('GET',url,null,success,error)
        }

        function postRequest(url,data,success,error){
            makeRequest("POST",url,data,success,error)
        }

        function deleteRequest(url,success,error){
            makeRequest("DELETE",url,null,success,error)
        }

        function editRequest(url,data,success,error){
            makeRequest('PUT',url,data,success,error)
        }

        return{
            getRequest:getRequest,
            postRequest:postRequest,
            deleteRequest:deleteRequest,
            editRequest:editRequest
        }
    }())



    var Books=(function(){
        function Books(baseUrl){
            this.serviceUrl=baseUrl+'Book/'
        }

        Books.prototype.getAllBooks=function(success,error){
            return Requester.getRequest(this.serviceUrl,success,error)
        }

        Books.prototype.postBook=function(book,success,error){
            return Requester.postRequest(this.serviceUrl,book,success,error)
        }

        Books.prototype.removeBook=function(id,success,error){
            return Requester.deleteRequest(this.serviceUrl+id,success,error)
        }

        Books.prototype.editBook=function(id,book,success,error){
            return Requester.editRequest(this.serviceUrl+id,book,success,error)
        }

        return Books;

    }())


    return{
        loadModels:function(baseUrl){
            return new Models(baseUrl)
        }
    }


}())
