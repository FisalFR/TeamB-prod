
import {ChangeEvent, useRef, useState} from 'react';
import '../../App.css';
import {HTMLInputElement} from "happy-dom";
import {optionWithSearch} from "common/src/option-with-search.ts";

function Dropdown(props: { options: string[]; placeholder: string; name: string; id: string; maxHeight: string; setInput:(str: string) => void; value: boolean; required: boolean; width:string; color:string; rounded: string}) {

    const optionList = props.options;
    const listElements = useRef<HTMLDivElement[]>([]);
    const cache = useRef([{search: '', options: [{option: '', search: ''}]}]);

    const [search, setSearch] = useState('');
    const [prevSearch, setPrevSearch] = useState('');
    const [dropdownClass, setDropdownClass] = useState("search-dropdown hidden z-10");
    const [scrollIndicator, setScrollIndicator] = useState(checkScrollIndicator(0));
    const [activeOption, setActiveOption] = useState(-1);
    const [currentOptions, setCurrentOptions] = useState(['']);

    //strings of the options showing with the corresponding search of a specific search type
    //n-normal t-transposition d-deletion s-substitution i-insertion
    let nOptions: optionWithSearch[] = [];
    let tOptions: optionWithSearch[] = [];
    let dOptions: optionWithSearch[] = [];
    let sOptions: optionWithSearch[] = [];
    let iOptions: optionWithSearch[] = [];

    //list of options for the current search
    const searchOptions: string[] = [];

    //check if the list of options showing is long enough for the scroll indicator to show
    function checkScrollIndicator(listLength: number) {
        if (listLength > 4) {
            return "scroll-indicator text-center w-full block";
        }
        return "scroll-indicator text-center w-full hidden";
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value !== search) {
            setPrevSearch(search);
            setSearch(e.target.value);
            setCurrentOptions(searchOptions);
            resetActive();
            setScrollIndicator(checkScrollIndicator(0));
        }
    }

    function createOptions() {
        if (search === '') {
            cache.current = [];
        }
        const filteredOptions: optionWithSearch[] = filterList(optionList, search);
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
        function filterAndCache(inputOptions: string[], sliceIndex: number) {
            let FSOptions: optionWithSearch[] = [];
            if (sliceIndex !== -1) {
                for (let i = sliceIndex; i < search.length; i++) {
                    nOptions = []; tOptions = []; dOptions = []; sOptions = []; iOptions = [];
                    inputOptions = inputOptions.filter((option) => fuzzySearch(option, search.slice(0, i + 1)));
                    FSOptions = nOptions.concat(tOptions, dOptions, sOptions, iOptions);
                    cache.current.push({search: search.slice(0, i + 1), options: FSOptions});
                }
            }
            else {
                inputOptions.filter((option) => fuzzySearch(option, search));
                FSOptions = nOptions.concat(tOptions, dOptions, sOptions, iOptions);
                cache.current.push({search: search, options: FSOptions});
            }
            return FSOptions;
        }

        if (search === '') {
            options.filter((option) => fuzzySearch(option, ''));
            return nOptions;
        }
        for (let i = 0; i < cache.current.length; i++) {
            if (search.toLowerCase() === cache.current[i].search.toLowerCase()) {
                return cache.current[i].options;
            }
        }
        if (search.slice(0, search.length - 1).toLowerCase() === prevSearch.toLowerCase() ||
            search.slice(1, search.length).toLowerCase() === prevSearch.toLowerCase()) {
            return filterAndCache(currentOptions, -1);
        }
        for (let i = 1; i < search.length - 1; i++) {
            if (search.split('')[i] !== prevSearch.split('')[i]) {
                for (let j = 0; j < cache.current.length; j++) {
                    if (search.slice(0, i).toLowerCase() === cache.current[j].search.toLowerCase()) {
                        const subSearch: string[] = [];
                        for (let k = 0; k < cache.current[j].options.length; k++) {
                            subSearch.push(cache.current[j].options[k].option);
                        }
                        return filterAndCache(subSearch, i);
                    }
                }
                break;
            }
        }
        return filterAndCache(options, 0);
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
                if (activeOption < searchOptions.length - 1) {
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
                    fillSearch(searchOptions[activeOption]);
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
                if (activeOption != searchOptions.length - 1) {
                    changeActive(searchOptions.length - 1);
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
            <input className={`w-full p-[5px] font-OpenSans ${props.color} ${props.rounded}`} type="text"

                   placeholder={props.placeholder} name = {props.name} id = {props.id} role = "combobox"
                   onBlur={hideDropdown} onFocus={showDropdown} onKeyDown={keyDown}
                   value={setVal()} required={props.required}
                   onChange={(e) => {handleInput(e);props.setInput(e.target.value);}}
                   aria-controls="options-dropdown" aria-expanded={dropdownClass === "search-dropdown block"}
                   aria-activedescendant = {"option" + activeOption} aria-haspopup="listbox">
            </input>

            <div className={`${props.width} relative`} >
                <div className={dropdownClass}>
                    <div className={`${props.maxHeight} overflow-auto`} role="listbox" id="options-dropdown">
                        {createOptions()}
                    </div>
                    <div className={scrollIndicator}>▼</div>
                </div>
            </div>

        </div>
    );
}

Dropdown.defaultProps = {
    width: "w-72",
    color: "bg-light-white",
    rounded: "",
    maxHeight:"max-h-48"

};

export default Dropdown;
