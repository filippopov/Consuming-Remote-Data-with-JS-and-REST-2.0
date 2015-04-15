var app=app||{};

app.viewModel=(function(){
    function ViewModel(model){
        this.model=model;
        this.attachEventListeners(this)
    }

    ViewModel.prototype.showAllBooks=function(){
        var _this=this;
        this.model.books.getAllBooks(
            function(booksData){
                booksData.results.forEach(function(book){
                    _this.addBooksToDom(book.title,book.author,book.isbn,book.objectId)
                })
            },
            function(error){
                console.log(error.responseText)
            }
        )
    }

    ViewModel.prototype.addBooksToDom=function(bookTitle,bookAuthor,bookIsbn,bookId){
        var _this=this;
        var booksWrapper=$('<div>').attr('class','books-list');
        booksWrapper.attr('data-id',bookId);
        $('<p>').text(bookTitle).appendTo(booksWrapper);
        $('<p>').text(bookAuthor).appendTo(booksWrapper);
        $('<p>').text(bookIsbn).appendTo(booksWrapper);
        $('<input>').attr('type','text').attr('id','title-'+bookId).appendTo(booksWrapper);
        $('<input>').attr('type','text').attr('id','author-'+bookId).appendTo(booksWrapper);
        $('<input>').attr('type','text').attr('id','isbn-'+bookId).appendTo(booksWrapper);
        var editButton=$('<button>').text('Edit').attr('id','btn-edit-'+bookId).appendTo(booksWrapper);
        var deleteButton=$('<button>').text('Delete').appendTo(booksWrapper);
        deleteButton.click(function(){
            _this.deleteBook(bookId)
        })
        editButton.click(function(){
            _this.editBooks(bookId)

        })
        $('#books-container').append(booksWrapper);

    }

    ViewModel.prototype.addBooks=function(viewModel){
        var bookTitle=$('#book-title').val();
        var bookAuthor=$('#book-author').val();
        var bookIsbn=$('#book-isbn').val();
        viewModel.model.books.postBook({title:bookTitle,author:bookAuthor,isbn:bookIsbn},
            function(data){
                viewModel.addBooksToDom(bookTitle,bookAuthor,bookIsbn,data.objectId)
            },
            function(error){

            }
        )
    }

    ViewModel.prototype.attachEventListeners=function(viewModel){
        $('#book-add').click(function(){
            viewModel.addBooks(viewModel)
        })
    }

    ViewModel.prototype.deleteBook=function(bookId){
        this.model.books.removeBook(bookId,function(data){
            $('#books-container').find('[data-id='+bookId+']').remove();
        },function(error){

        })
    }

    ViewModel.prototype.editBooks=function(bookId){
        var editTitle=$('#title-'+bookId).val();
        var editAuthor=$('#author-'+bookId).val();
        var editIsbn=$('#isbn-'+bookId).val();
        this.model.books.editBook(bookId,{title:editTitle,author:editAuthor,isbn:editIsbn},
            function(data){

                var model=app.models.loadModels('https://api.parse.com/1/classes/');
                var viewModel=new app.viewModel.loadViewModel(model);
                $('#books-container').html(' ');
                viewModel.showAllBooks();
            },
            function(error){

            }
        )
    }

    return{
        loadViewModel:function(model){
            return new ViewModel(model)
        }
    }
}())
