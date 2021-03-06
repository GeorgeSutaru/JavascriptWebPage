var editable=false;
function editTable(){
    if (editable==true){
        $("tr").each(function() {
            $(this).children("td.description").each(function(){
                this.innerHTML = $(this).children("textarea")[0].value;
            })
            $ (this).children("td.dropdown"). each(function() {
            this.innerHTML = $ (this).children("select").first().find(":selected").text();
            })
        });
      $('#hide').css('visibility','hidden');
      editable=false;
    } else {
        $('#hide').css('visibility','visible');
        var baseDropdown = document.createElement("select");
        var base_url = window.location.origin;
        $.get(base_url+'/api/users', function (data, status) {
            data.forEach(record => {
                var option = document.createElement("option");
                option.setAttribute("value",record.username);
                option.innerHTML=record.username;
                baseDropdown.appendChild(option);
            });
            $("tr").each(function() {
                $(this).children("td.description").each(function(){
                    var descriptionTextarea = document.createElement("textarea");
                    var descriptionTextNode = document.createTextNode(this.innerHTML);
                    descriptionTextarea.appendChild(descriptionTextNode);
                    this.innerHTML = "";
                    this.appendChild(descriptionTextarea);
                });
                $(this).children("td.dropdown").each(function() {
                    var currentValue = this.innerHTML;
                    this.innerHTML="";
                    var dropdown = baseDropdown.cloneNode(true);
                    this.appendChild(dropdown);
                    selectItemByValue(dropdown, currentValue);
                });
            });
        });
    editable=true;
    }
}

function addField()
{
    var table = $("#Marvel");
    var numberOfRows=table.children("tr").length;
    var row = table.get(0).insertRow(numberOfRows);
    var checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    row.append(checkBox);
    checkBox.addEventListener("click", function() {
        if (this.checked == true) {
            this.parentNode.style.textDecoration='line-through';
        } else {
            this.parentNode.style.textDecoration='none';
        }
    });
    var cellNo = document.createElement('td');
    row.append(cellNo);
    var descriere = document.createElement('td');
    descriere.className="description";
    row.append(descriere);
    var descriptionTextarea = document.createElement("textarea");
    var descriptionTextNode = document.createTextNode(descriere.innerHTML);
    descriptionTextarea.appendChild(descriptionTextNode);
    descriere.innerHTML = "";
    descriere.appendChild(descriptionTextarea);
    var baseDropdown = document.createElement("select");
    var base_url = window.location.origin;
    $.get(base_url+'/api/users', function (data, status) {
        var asignee = document.createElement('td');
        row.append(asignee);
        asignee.className = "dropdown";
        data.forEach(record => {
            var option = document.createElement("option");
            option.setAttribute("value",record.username);
            option.innerHTML=record.username;
            baseDropdown.appendChild(option);
            asignee.appendChild(baseDropdown);
        });
    });
}




function loadTable() {

    var table = $("#Marvel");

    var base_url = window.location.origin;
    $.get(base_url+'/api/issues', function (data, status) {
        // Begin accessing JSON data here
        if (status == 'success') {
            var headerRow = document.createElement('tr');
            table.append(headerRow);
            var cbColumn = document.createElement('th');
            headerRow.append(cbColumn);
            var cellNo = document.createElement('th');
            cellNo.innerHTML = data.header[0];
            headerRow.append(cellNo);
            var description = document.createElement('th');
            description.innerHTML = data.header[1];
                headerRow.append(description);
            var assignee = document.createElement('th');
            assignee.innerHTML = data.header[2];
            headerRow.append(assignee);
            data.body.forEach(record => {
                var row = document.createElement('tr');
                table.append(row);
                var checkBox = document.createElement("INPUT");
                checkBox.setAttribute("type", "checkbox");
                row.append(checkBox);
                if (record.isDone == true) {
                    checkBox.checked = true;
                    row.style.textDecoration='line-through';
                } else {
                    row.style.textDecoration='none';
                }
                checkBox.addEventListener("click", function() {
                    if (this.checked == true) {
                        this.parentNode.style.textDecoration='line-through';
                    } else {
                        this.parentNode.style.textDecoration='none';
                    }
                });
                var cellNo = document.createElement('td');
                cellNo.innerHTML = record.id;
                row.append(cellNo);
                var description = document.createElement('td');
                description.className = "description";
                description.innerHTML = record.description;
                row.append(description);
                var assignee = document.createElement('td');
                assignee.className = "dropdown";
                assignee.innerHTML = record.assignee;
                row.append(assignee);
            });
        } else {
            console.log(data + ' = ' + status );
        }
    });

    $("tr").each(function () {
        $(this).children("td.description").each(function () {
            this.innerHTML = $(this).children("textarea")[0].value;
        })
    });
}

function selectItemByValue(elment, value){
    for(var i=0; i < elment.options.length; i++)
    {
        if(elment.options[i].value == value)
            elment.selectedIndex = i;
    }
}

loadTable();