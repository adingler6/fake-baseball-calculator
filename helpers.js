var pitcherList;
var batterList;
$(function(){
    $('#pitcher-search').keyup(function(){
        document.getElementById("pitcher-list").style.display = "";
        if(!pitcherList) {
            generatePitcherList();
        }
        var current_query = $('#pitcher-search').val().toLowerCase();
        if (current_query !== "") {
            $(".list-group li").hide();
            $(".list-group li").each(function(){
                var current_keyword = $(this).text().toLowerCase();
                if (current_keyword.indexOf(current_query) >= 0) {
                    $(this).show();
                }
            })
        } else {
            $(".list-group li").hide();
        }
    })
});

$(function(){
    $('#batter-search').keyup(function(){
        document.getElementById("batter-list").style.display = "";
        if(!batterList) {
            generateBatterList();
        }
        var current_query = $('#batter-search').val().toLowerCase();
        if (current_query !== "") {
            $(".list-group li").hide();
            $(".list-group li").each(function(){
                var current_keyword = $(this).text().toLowerCase();
                if (current_keyword.indexOf(current_query) >= 0) {
                    $(this).show();
                }
            })
        } else {
            $(".list-group li").hide();
        }
    })
});

document.getElementById("pitcher-list").addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "LI") {
        pitcherName = e.target.textContent;
        var pitcherSearch = document.getElementById('pitcher-search');
        pitcherSearch.value = pitcherName;
        document.getElementById("pitcher-list").style.display = "none";
        document.getElementById("pitcher-type").value = pitchers[pitcherName]['type'].toLowerCase();
        document.getElementById("pitcher-hand").value = pitchers[pitcherName]['hand'].toLowerCase();
    }
});

document.getElementById("batter-list").addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "LI") {
        batterName = e.target.textContent;
        var batterSearch = document.getElementById('batter-search');
        batterSearch.value = batterName;
        document.getElementById("batter-list").style.display = "none";
        document.getElementById("batter-type").value = batters[batterName]['type'].toLowerCase();
        document.getElementById("batter-hand").value = batters[batterName]['hand'].toLowerCase();
    }
});

function generatePitcherList() {
    pitcherList = document.getElementById('pitcher-list');
    for (var pitcher in pitchers) {
        var entry = document.createElement('li');
        pitcherList.appendChild(entry);
        entry.innerHTML = pitcher;
        entry.className = "list-group-item";
    }
}

function generateBatterList() {
    batterList = document.getElementById('batter-list');
    for (var batter in batters) {
        var entry = document.createElement('li');
        batterList.appendChild(entry);
        entry.innerHTML = batter;
        entry.className = "list-group-item";
    }
}

element1 = document.getElementById("submit");
element1.addEventListener("click", generateAtBat);

function generateAtBat() {
    var e = document.getElementById('pitcher-type');
    var pitcher_type = e.options[e.selectedIndex].value;
    e = document.getElementById('pitcher-hand');
    var pitcher_hand = e.options[e.selectedIndex].value;
    var pitcher_number = parseInt(document.getElementById('pitcher-number').value);

    var e = document.getElementById('batter-type');
    var batter_type = e.options[e.selectedIndex].value;
    e = document.getElementById('batter-hand');
    var batter_hand = e.options[e.selectedIndex].value;
    var batter_number = parseInt(document.getElementById('batter-number').value);


    if (Number.isNaN(pitcher_number) || Number.isNaN(batter_number)) {
        document.getElementById('at-bat-result').innerText = 'Input numbers must be integers';
        return
    }
    if (batter_number < 1 || batter_number > 1000) {
        document.getElementById('at-bat-result').innerText = 'Batter Number must be between 1 and 1000';
        return
    }

    if (pitcher_number < 1 || pitcher_number > 1000) {
        document.getElementById('at-bat-result').innerText = 'Pitcher Number must be between 1 and 1000';
        return
    }

    results = getResult(pitcher_hand, pitcher_type, pitcher_number,
        batter_hand, batter_type, batter_number)
    document.getElementById('at-bat-result').innerText = 'Result: ' + results[0] + ' (difference: ' + results[1] + ')';
    document.getElementById('range-result').innerText = 'difference fell in range [' + results[2] + '-' + results[3] + ']';

}
function getResult(pitcher_hand, pitcher_type, pitcher_number, batter_hand, batter_type, batter_number) {
    var difference = getDifference(pitcher_number, batter_number);
    var hand = 'same';
    if (batter_hand != pitcher_hand) {
        hand = 'different';
    }
    console.log(pitcher_type + batter_type + hand);
    var outcomes = results_dict[pitcher_type][batter_type][hand];
    for (var index in outcomes) {
        outcome = outcomes[index];
        if (difference >= outcome['start_number'] && difference <= outcome['end_number']) {
            return [outcome['result'], difference, outcome['start_number'], outcome['end_number']];
        }
    }

}

function getDifference(pitcher_number, batter_number) {
    var max_number = Math.max(pitcher_number, batter_number);
    var min_number = Math.min(pitcher_number, batter_number);
    return Math.min(max_number - min_number, 1000 - max_number + min_number);
}

