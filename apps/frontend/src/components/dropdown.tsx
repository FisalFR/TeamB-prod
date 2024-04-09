
import {ChangeEvent, useRef, useState} from 'react';
import '../App.css';

function Dropdown(props: { options: string[]; placeholder: string; name: string; id: string; setInput:(str: string) => void; value : boolean; required:boolean; width:string}) {

    const optionList = props.options;
    const listElements = useRef<HTMLDivElement[]>([]);

    const [search, setSearch] = useState("");
    const [dropdownClass, setDropdownClass] = useState("search-dropdown hidden z-10");
    const [scrollIndicator, setScrollIndicator] = useState(checkScrollIndicator(optionList.length));
    const [activeOption, setActiveOption] = useState(-1);

    //strings of the options showing with the current search
    let optionStrings: string[];

    //check if the list of options showing is long enough for the scroll indicator to show
    function checkScrollIndicator(listLength: number) {
        if (listLength > 5) {
            return "scroll-indicator text-center w-full block";
        }
        return "scroll-indicator text-center w-full hidden";
    }


    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        resetActive();
        const filteredLength = filterList(optionList, e.target.value).length;
        setScrollIndicator(checkScrollIndicator(filteredLength));
    }

    function createOptions() {
        const filteredOptions = filterList(optionList, search);
        optionStrings = filteredOptions;
        listElements.current = [];
        return filteredOptions.map( (option, index) =>
            <div className="dropdown-option p-1 bg-white aria-selected:bg-bone-white" onMouseLeave={resetActive}
                 onMouseDown={() => {fillSearch(option); props.setInput(option);}}
                 role="option" onMouseOver={() => setActiveOption(index)}
                 aria-selected={index === activeOption} id = {"option" + index} key = {"option" + index}
                 ref = {(element) => {if (element != null) listElements.current.push(element);}}>
                {getBolded(option)}
            </div>);
    }
    function getBolded(option: string) {
        const searchInd = option.toLowerCase().indexOf(search.toLowerCase());
        const firstHalf = option.substring(0,searchInd);
        const bolded: string = option.substring(searchInd, searchInd + search.length);
        const lastHalf = option.substring(searchInd + search.length, option.length);
        return <span>{firstHalf}<b>{bolded}</b>{lastHalf}</span>;
    }

    function filterList(options : string[], search : string) {
        return options.filter( (option) =>
            option.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
    }

    function fillSearch(option: string) {
        setSearch(option);
        resetActive();
    }

    function hideDropdown() {
        setDropdownClass("search-dropdown hidden z-10");
        resetActive();
    }
    function showDropdown() {
        setDropdownClass("search-dropdown block z-10");
    }

    function keyDown(e: { preventDefault: () => void; key: string; }) {
        switch(e.key) {
            case "ArrowDown":
                if (activeOption < optionStrings.length-1) {
                    changeActive(activeOption + 1);
                }
                break;
            case "ArrowUp":
                if (activeOption > 0) {
                    changeActive(activeOption - 1);
                }
                break;
            case "Enter":
                if (activeOption >= 0) {
                    fillSearch(optionStrings[activeOption]);
                    resetActive();
                    setScrollIndicator("scroll-indicator text-center hidden");
                }
                break;
            case "Home":
            case "PageUp":
                e.preventDefault();
                if (activeOption != 0) {
                    changeActive(0);
                }
                break;
            case "End":
            case "PageDown":
                e.preventDefault();
                if (activeOption != optionStrings.length-1) {
                    changeActive(optionStrings.length - 1);
                }
                break;
        }
    }
    function resetActive() {
        setActiveOption(-1);
    }
    function changeActive(active: number) {
        const element = listElements.current[active];
        if (element != null) {
            element.scrollIntoView(false);
            setActiveOption(active);
        }
    }

    function setVal() {
        if ((props.value) && (search != "")){
            setSearch("");
        }
        return search;
    }


    return (
        <div className={`${props.width} text-left`}>
            <input className="w-full p-[5px]" type="text"
                   placeholder={props.placeholder} name = {props.name} id = {props.id} role = "combobox"
                   onBlur={hideDropdown} onFocus={showDropdown} onKeyDown={keyDown}
                   value={setVal()} required={props.required}
                   onChange={(e) => {handleInput(e);props.setInput(e.target.value);}}
                   aria-controls="options-dropdown" aria-expanded={dropdownClass === "search-dropdown block"}
                   aria-activedescendant = {"option" + activeOption} aria-haspopup="listbox">
            </input>

            <div className={`${props.width}`}>
                <div className={dropdownClass}>
                    <div className="max-h-48 overflow-scroll" role="listbox" id="options-dropdown">
                        {createOptions()}
                    </div>
                    <div className={scrollIndicator}>▼</div>
                </div>
            </div>

        </div>
    );
}

Dropdown.defaultProps = {
    width: "w-72"
};

export default Dropdown;
