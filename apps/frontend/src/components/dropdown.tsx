
import {ChangeEvent, useRef, useState} from 'react';
import '../App.css';
import {HTMLInputElement} from "happy-dom";
import {optionWithSearch} from "common/src/optionWithSearch.ts";

function Dropdown(props: { options: string[]; placeholder: string; name: string; id: string; setInput:(str: string) => void; value : boolean; required:boolean; width:string}) {

    const optionList = props.options;
    const listElements = useRef<HTMLDivElement[]>([]);

    const [search, setSearch] = useState("");
    const [dropdownClass, setDropdownClass] = useState("search-dropdown hidden z-10");
    const [scrollIndicator, setScrollIndicator] = useState(checkScrollIndicator(optionList.length));
    const [activeOption, setActiveOption] = useState(-1);
    const [currentOptions, setCurrentOptions] = useState(['']);
    const [cache, addToCache] = useState([{search: '', options: [{option: '', search: ''}]}]);

    //strings of the options showing with the corresponding search of a specific search type
    //n-normal t-transposition d-deletion s-substitution i-insertion
    const nOptions: optionWithSearch[] = [];
    const tOptions: optionWithSearch[] = [];
    const dOptions: optionWithSearch[] = [];
    const sOptions: optionWithSearch[] = [];
    const iOptions: optionWithSearch[] = [];

    //list of options for the current search
    let searchOptions: string[] = [];

    //check if the list of options showing is long enough for the scroll indicator to show
    function checkScrollIndicator(listLength: number) {
        if (listLength > 5) {
            return "scroll-indicator text-center w-full block";
        }
        return "scroll-indicator text-center w-full hidden";
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value !== search) {
            setSearch(e.target.value);
            setCurrentOptions(searchOptions);
            addToCache(cache);
            resetActive();
            setScrollIndicator(checkScrollIndicator(currentOptions.length));
        }
    }

    function createOptions() {
        const filteredOptions: optionWithSearch[] = filterList(optionList, search);
        searchOptions = [];
        for (let i = 0; i < filteredOptions.length; i++) {
            searchOptions.push(filteredOptions[i].option);
        }
        listElements.current = [];
        return filteredOptions.map( (option, index) =>
            <div className="dropdown-option p-1 bg-white aria-selected:bg-bone-white" onMouseLeave={resetActive}
                 onMouseDown={() => {fillSearch(option.option); props.setInput(option.option);}}
                 role="option" onMouseOver={() => setActiveOption(index)}
                 aria-selected={index === activeOption} id = {"option" + index} key = {"option" + index}
                 ref = {(element) => {if (element != null) listElements.current.push(element);}}>
                {getBolded(option)}
            </div>);
    }

    function getBolded(option: optionWithSearch) {
        let thisSearch = option.search;
        if (option.option.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            thisSearch = search;
        }
        const searchInd = option.option.toLowerCase().indexOf(thisSearch.toLowerCase());
        const firstHalf = option.option.substring(0, searchInd);
        const bolded = option.option.substring(searchInd, searchInd + thisSearch.length);
        const lastHalf = option.option.substring(searchInd + thisSearch.length, option.option.length);
        if (thisSearch === search) {
            return <span>{firstHalf}<b>{bolded}</b>{lastHalf}</span>;
        }
        return <span><i>{firstHalf}<b>{bolded}</b>{lastHalf}</i></span>;
    }

    function filterList(options : string[], search : string): optionWithSearch[] {
        let FSOptions: optionWithSearch[] = [];
        if (search === '') {
            options.filter((option) => fuzzySearch(option, ''));
            return nOptions;
        }
        for (let i = 0; i < cache.length; i++) {
            if (search.toLowerCase() === cache[i].search.toLowerCase()) {
                return cache[i].options;
            }
        }
        if (search.slice(0, search.length - 1).toLowerCase() === cache[cache.length - 1].search.toLowerCase()) {
            currentOptions.filter((option) => fuzzySearch(option, search));
            FSOptions = nOptions.concat(tOptions, dOptions, sOptions, iOptions);
            cache.push({search: search, options: FSOptions});
            return FSOptions;
        }
        options.filter((option) => fuzzySearch(option, search));
        FSOptions = nOptions.concat(tOptions, dOptions, sOptions, iOptions);
        cache.push({search: search, options: FSOptions});
        return FSOptions;
    }

    function fuzzySearch(option: string, search: string) {
        if(option.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            nOptions.push({option: option, search: search});
            return true;
        }

        function testSearch(searchType: string, pos?: number) {
            let valid = false;
            if (!pos) {
                if (option.toLowerCase().indexOf(searchArray.join('').toLowerCase()) !== -1) {
                    valid = true;
                }
            }
            else {
                for (let char = 0; char < chars.length; char++) {
                    searchArray.splice(pos, 1, chars[char]);
                    if (option.toLowerCase().indexOf(searchArray.join('').toLowerCase()) !== -1) {
                        valid = true;
                        break;
                    }
                }
            }
            if (valid) {
                switch (searchType) {
                    case 'transposition':
                        tOptions.push({option: option, search: searchArray.join('')});
                        return true;
                    case 'deletion':
                        dOptions.push({option: option, search: searchArray.join('')});
                        return true;
                    case 'substitution':
                        sOptions.push({option: option, search: searchArray.join('')});
                        return true;
                    case 'insertion':
                        iOptions.push({option: option, search: searchArray.join('')});
                        return true;
                }
            }
            searchArray = search.split('');
        }

        const chars: string[] = 'abcdefghijklmnopqrstuvwxyz1234567890&?- '.split('');
        let searchArray: string[] = search.split('');

        if (searchArray.length > 1) {
            //transposition
            for (let pos = 0; pos < searchArray.length - 1; pos++) {
                searchArray.splice(pos, 0, searchArray[pos + 1]);
                searchArray.splice(pos + 2, 1);
                if (testSearch('transposition')) {
                    return true;
                }
            }

            //deletion
            for (let pos = 0; pos < searchArray.length; pos++) {
                searchArray.splice(pos, 1);
                if (testSearch('deletion')) {
                    return true;
                }
            }

            //substitution
            for (let pos = 1; pos < searchArray.length - 1; pos++) {
                if (testSearch('substitution', pos)) {
                    return true;
                }
            }

            //insertion
            for (let pos = 1; pos < searchArray.length; pos++) {
                searchArray.splice(pos, 0, ' ');
                if (testSearch('insertion', pos)) {
                    return true;
                }
            }
        }
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
                if (activeOption < currentOptions.length - 1) {
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
                    fillSearch(currentOptions[activeOption]);
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
                if (activeOption != currentOptions.length - 1) {
                    changeActive(currentOptions.length - 1);
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
        <div className={`${props.width} text-left` }>
            <input className="w-full p-[5px]" type="text"

                   placeholder={props.placeholder} name = {props.name} id = {props.id} role = "combobox"
                   onBlur={hideDropdown} onFocus={showDropdown} onKeyDown={keyDown}
                   value={setVal()} required={props.required}
                   onChange={(e) => {handleInput(e);props.setInput(e.target.value);}}
                   aria-controls="options-dropdown" aria-expanded={dropdownClass === "search-dropdown block"}
                   aria-activedescendant = {"option" + activeOption} aria-haspopup="listbox">
            </input>

            <div className={`${props.width} relative`} >
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
