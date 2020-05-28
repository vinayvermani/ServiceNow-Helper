jQuery(document).ready(function() {
    
	var dlgModal  = GlideModal.get();
	
	var onOk = dlgModal.getPreference("onOk");
	var onCancel = dlgModal.getPreference("onCancel");
	var dataFn = dlgModal.getPreference("dataProvider");
	
	var dlgDataState = {
		name: "vinay"
	};
	
	jQuery("#custom_dlg_ok_button").on("click",function(){
		onOk(dlgDataState);
		dlgModal.destroy();
	});
	
	jQuery("#custom_dlg_cancel_button").on("click",function(){
		onCancel({ name: "cancelled "});
		dlgModal.destroy();
	});



    /*
	var labels = ["vinay            d", "vermani", "aman"]; //dataFn(); 
    var $lElems = labels.map(function(l) {
        return jQuery("<div>" + l + "</div>");
    });


    var $tSections = tabbedSections(labels, $lElems);
    $tSections.appendTo("#container");
	*/

    var groups = [{
            id: "1g",
            label: "a-g"
        },
        {
            id: "2g",
            label: "b-g"
        },
        {
            id: "3g",
            label: "c-g"
        },
        {
            id: "4g",
            label: "d-g"
        }
    ];

    var Users = [{
            id: "1u",
            label: "a-u"
        },
        {
            id: "2u",
            label: "b-u"
        },
        {
            id: "3u",
            label: "c-u"
        },
        {
            id: "4u",
            label: "d-u"
        }
    ];



    var data = [{
            label: "Groups",
            checks: groups
        },
        {
            label: "Users",
            checks: Users
        }
    ];




    var onChange = function(state) {
        dlgDataState =state;
    };

    $checksets(data, onChange).appendTo("#container");




    //This creates tab sections
    function tabbedSections(sectionLabels, $sectionElements) {
        var activeIndex = 0;


        var $sectionCont = jQuery("<div class='section-cont'></div>");
        var $sectionHead = jQuery("<div class='section-head'></div>");
        var $sectionButtons = sectionLabels.map(function(label) {
            return jQuery("<div class='section-button'>" + label + "</div>");
        });

        $sectionButtons[activeIndex].addClass("active");

        //section button handler
        var onButtonClick = function(event) {
            activeIndex = event.data.activeIndex;
            $sectionElements.forEach(function($sE, index) {
                $sectionButtons[index].removeClass("active");
                $sE.removeClass("active");
            });
            $sectionElements[activeIndex].addClass("active");
            $sectionButtons[activeIndex].addClass("active");

        };

        $sectionButtons.forEach(function($elem, index) {

            //Add event handler to buttons
            $elem.on("click", {
                activeIndex: index
            }, onButtonClick);

            //add button to section head
            $elem.appendTo($sectionHead);
        });


        var $sectionBody = jQuery("<div class='section-body'></div>");
        $sectionHead.appendTo($sectionCont);
        $sectionBody.appendTo($sectionCont);

        $sectionElements.forEach(function($elem, index) {
            $elem.attr("data-section-name", "section" + index + "-" + sectionLabels[index]);
            $elem.addClass("section-data-item");
            if (index == 0) {
                $elem.addClass("active");
            }
            $elem.appendTo($sectionBody);
        });
        return $sectionCont;
    }




    //CheckSet Component (uses tabbedSections Component)
    function $checksets(propArr, onChange) {
        var state = propArr.map(function(set) {
            return {
                label: set.label,
                checks: set.checks.map(function(c) {
                    c.checked = false;
                    return c;
                })
            };
        });

        var onSetChange = function(setLabel) {
            return function(checksetState) {
                var sIndex = findIndex(function(i) {
                    return i.label == setLabel;
                }, state);

                if (sIndex >= 0) {
                    state[sIndex].checks = checksetState;

                    onChange(state);
                }

            };
        };

        var setLabels = state.map(function(set) {
            return set.label;
        });
        var $sets = state.map(function(set) {
            return $checkset(set.checks, onSetChange(set.label));
        });

        return tabbedSections(setLabels, $sets);
    }


    //Checkbox Component
    function $checkbox(props, click) {
        
		var $inputElem = jQuery("<input type='checkbox' value='None' id='checkbox-" + props.label + "-" + props.id + "' name='checkbox-" + props.label + "-" + props.id + "'/>");
        var $boxElem = jQuery("<label for='checkbox-" + props.label + "-" + props.id + "'></label>");

        $boxElem.on("click", {
            id: props.id
        }, click);

        var template = //"<div style='padding-bottom: 10px;'>"+
            //"<span style='font-weight: bold'>"+props.label+"</span>"+
            //"</div>"+
            "<div class='filter-checkbox'>" +
            "<div class='checkbox'>" +
            "</div> " +
            "<label style='padding-left:5px; margin-bottom:0px'>" + props.label + "</label>" +
            "</div>";
		
        var $elem = jQuery(template);

		$elem.find("div.checkbox").append($inputElem);
		$elem.find("div.checkbox").append($boxElem);
        return $elem;

    }
    //Checkset Component
    function $checkset(propArr, onChange) {
        var state = propArr.slice(0).map(function(i) {
            i.checked = false;
            return i;
        });
        var onCheckClick = function(event) {

            if (event.data.id) {
                var idIndex = findIndex(function(i) {
                    return i.id == event.data.id;
                }, state);

                if (idIndex >= 0) {
                    state[idIndex].checked = !state[idIndex].checked;
                    onChange(state);
                }
            }
        };
        var div = jQuery("<div></div>");
        propArr.map(function(prop) {
            return $checkbox(prop, onCheckClick);
        }).forEach($appendTo(div));
        return div;
    }

    //Utility Functions
    function $appendTo(selector) {
        return function($elem) {
            $elem.appendTo(selector);
        };
    }


    function findIndex(fn, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (fn(arr[i])) {
                return i;
            }
        }
        return -1;
    }



});
