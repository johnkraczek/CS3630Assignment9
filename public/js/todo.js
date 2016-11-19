(function (exports) {
	exports.toDoApp = new Vue({
		el: '#toDoApp',
		data: {
			id: '',
			title:
			{
				text:'Your List',
				editState:true
			},
			current: '',
			todos:[
				{
					text: 'Hello World',
					checked: false
				}
			]
		},
		methods: {
			toggle:function(todo){
				todo.editState?todo.editState=false:todo.editState=true;
			},
			add: function () {
				if (this.current != '') {
					this.todos.push({
						text: this.current,
						checked: false
					});
					this.current = '';
				}
				else
					toastr['warning']('Please enter a ToDo in the input box. ', 'Enter Todo');
			},
			editTitle: function () {
				if (this.title.text != '') {
					if (this.title.editState)
						this.title.editState = false;
					else
						this.title.editState = true;
				} else
					toastr['warning']('Please enter a list title. ', 'Enter Title');

			},
			save: function () {
				if (this.title.text != '') {

					//convert our vue object to list object so we can send it. 
					let list = {};
					list.id = this.id;
					list.title = this.title.text;
					list.todos = [];
					this.todos.forEach(li => {
						let todo = {};
						todo.text = li.text;
						todo.checked = li.checked;
						list.todos.push(todo);
					});
					// we want to post to the api location to save the list.
					$.ajax({
						url: '/list/api/save',
						contentType: 'application/json; charset=utf-8',
						method: 'POST',
						cache: false,
						data: JSON.stringify(list),
						dataType: 'json',
						success: function (data) {
							setTimeout(function(){ window.location.replace(`/list/edit/${data}`); }, 2350);
						}
					});
					toastr['success']('Successfully saved that list', 'Saved');
				} else
					toastr['warning']('Please enter a list title.', 'Enter Title');
			},
			fetchData: function (id) {
				if(id != ''){
					$.ajax({
						url: '/list/edit/'+id,
						method: 'POST',
						dataType: 'json',
						success: function (data) {
							toDoApp.title.text = data.title;
							toDoApp.todos = data.todos;
							toDoApp.id = id;
						}
					});
				}
			}
		}
	});
})(window);