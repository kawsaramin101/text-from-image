<script>
    import { createWorker } from "tesseract.js";

    // prettier-ignore
    const languages=[{name: "Automatic detection", value: "auto"},{name:"Afrikaans",value:"afr"},{name:"Amharic",value:"amh"},{name:"Arabic",value:"ara"},{name:"Assamese",value:"asm"},{name:"Azerbaijani",value:"aze"},{name:"Azerbaijani - Cyrillic",value:"aze_cyrl"},{name:"Belarusian",value:"bel"},{name:"Bengali",value:"ben"},{name:"Tibetan",value:"bod"},{name:"Bosnian",value:"bos"},{name:"Bulgarian",value:"bul"},{name:"Catalan; Valencian",value:"cat"},{name:"Cebuano",value:"ceb"},{name:"Czech",value:"ces"},{name:"Chinese - Simplified",value:"chi_sim"},{name:"Chinese - Traditional",value:"chi_tra"},{name:"Cherokee",value:"chr"},{name:"Welsh",value:"cym"},{name:"Danish",value:"dan"},{name:"German",value:"deu"},{name:"Dzongkha",value:"dzo"},{name:"Greek, Modern (1453-)",value:"ell"},{name:"English",value:"eng"},{name:"English, Middle (1100-1500)",value:"enm"},{name:"Esperanto",value:"epo"},{name:"Estonian",value:"est"},{name:"Basque",value:"eus"},{name:"Persian",value:"fas"},{name:"Finnish",value:"fin"},{name:"French",value:"fra"},{name:"German Fraktur",value:"frk"},{name:"French, Middle (ca. 1400-1600)",value:"frm"},{name:"Irish",value:"gle"},{name:"Galician",value:"glg"},{name:"Greek, Ancient (-1453)",value:"grc"},{name:"Gujarati",value:"guj"},{name:"Haitian; Haitian Creole",value:"hat"},{name:"Hebrew",value:"heb"},{name:"Hindi",value:"hin"},{name:"Croatian",value:"hrv"},{name:"Hungarian",value:"hun"},{name:"Inuktitut",value:"iku"},{name:"Indonesian",value:"ind"},{name:"Icelandic",value:"isl"},{name:"Italian",value:"ita"},{name:"Italian - Old",value:"ita_old"},{name:"Javanese",value:"jav"},{name:"Japanese",value:"jpn"},{name:"Kannada",value:"kan"},{name:"Georgian",value:"kat"},{name:"Georgian - Old",value:"kat_old"},{name:"Kazakh",value:"kaz"},{name:"Central Khmer",value:"khm"},{name:"Kirghiz; Kyrgyz",value:"kir"},{name:"Korean",value:"kor"},{name:"Kurdish",value:"kur"},{name:"Lao",value:"lao"},{name:"Latin",value:"lat"},{name:"Latvian",value:"lav"},{name:"Lithuanian",value:"lit"},{name:"Malayalam",value:"mal"},{name:"Marathi",value:"mar"},{name:"Macedonian",value:"mkd"},{name:"Maltese",value:"mlt"},{name:"Malay",value:"msa"},{name:"Burmese",value:"mya"},{name:"Nepali",value:"nep"},{name:"Dutch; Flemish",value:"nld"},{name:"Norwegian",value:"nor"},{name:"Oriya",value:"ori"},{name:"Panjabi; Punjabi",value:"pan"},{name:"Polish",value:"pol"},{name:"Portuguese",value:"por"},{name:"Pushto; Pashto",value:"pus"},{name:"Romanian; Moldavian; Moldovan",value:"ron"},{name:"Russian",value:"rus"},{name:"Sanskrit",value:"san"},{name:"Sinhala; Sinhalese",value:"sin"},{name:"Slovak",value:"slk"},{name:"Slovenian",value:"slv"},{name:"Spanish; Castilian",value:"spa"},{name:"Spanish; Castilian - Old",value:"spa_old"},{name:"Albanian",value:"sqi"},{name:"Serbian",value:"srp"},{name:"Serbian - Latin",value:"srp_latn"},{name:"Swahili",value:"swa"},{name:"Swedish",value:"swe"},{name:"Syriac",value:"syr"},{name:"Tamil",value:"tam"},{name:"Telugu",value:"tel"},{name:"Tajik",value:"tgk"},{name:"Tagalog",value:"tgl"},{name:"Thai",value:"tha"},{name:"Tigrinya",value:"tir"},{name:"Turkish",value:"tur"},{name:"Uighur; Uyghur",value:"uig"},{name:"Ukrainian",value:"ukr"},{name:"Urdu",value:"urd"},{name:"Uzbek",value:"uzb"},{name:"Uzbek - Cyrillic",value:"uzb_cyrl"},{name:"Vietnamese",value:"vie"},{name:"Yiddish",value:"yid"}];

    let files;
    let fileInput;
    let output = "";
    let isProcessing = false;
    let error = "";

    function isFileImageAndAcceptedFormat(file) {
        const acceptedImageTypes = [
            "image/bmp", // BMP
            "image/jpeg", // JPG
            "image/png", // PNG
            "image/x-portable-bitmap", // PBM
            "image/webp", // WEBP
        ];

        return file && acceptedImageTypes.includes(file.type);
    }

    async function handleFileUpload(files) {
        isProcessing = true;
        if (files.length > 0) {
            const file = files[0];
            if (isFileImageAndAcceptedFormat(file)) {
                const worker = await createWorker("eng");
                const ret = await worker.recognize(file);
                output = ret.data.text;
                console.log(ret.data.text);
                await worker.terminate();
                isProcessing = false;
            } else {
                error = "File type is not accepted.";
            }
        }
    }

    let isDropAreaActive = false;

    let dragStatus = "Drag files here to upload";

    function handleDragOver(event) {
        event.preventDefault();
        isDropAreaActive = true;
        dragStatus = "Release to Upload File";
    }

    function handleDragLeave(event) {
        event.preventDefault();
        isDropAreaActive = false;
        dragStatus = "Drag files here to upload";
    }

    function handleDrop(event) {
        event.preventDefault();
        dragStatus = "Drag files here to upload";
        handleFileUpload(event.dataTransfer.files);
    }
    function handleInputChange(event) {
        handleFileUpload(event.target.files);
    }
</script>

<main>
    <div class="center">
        <div>
            <label for="language">language :</label>
            <select name="language" id="language" style="width: 200px;">
                {#each languages as language}
                    <option value={language.value}>{language.name}</option>
                {/each}
            </select>
            <br />
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:drop={handleDrop} on:dragleave={handleDragLeave} on:dragover={handleDragOver} class="uploadContainer" class:active={isDropAreaActive} aria-dropeffect="copy">
                <img height="70px" width="70px" src="/svgs/cloud-arrow-up-light.svg" alt="Cloud arrow up" />
                <span class="drag-file">{dragStatus}</span>
                <header class="header">
                    <span class="mt">
                        or <button class="file-input-button" on:click={() => fileInput.click()}> select a file </button>
                        from your device
                    </span>
                </header>
                <p class="small-text">BMP, JPG, PNG, PBM and WEBP only.</p>
                <input on:change={handleInputChange} bind:this={fileInput} type="file" class="file-input" hidden />
            </div>

            {#if isProcessing}
                Loading...
            {/if}

            <textarea id="textarea" spellcheck="false">{output}</textarea>
        </div>
    </div>
</main>

<style>
    main {
        padding: 20px;
    }

    textarea {
        background-color: #222222;
        color: #fff;
        padding: 10px;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        resize: vertical;
        width: 100%;
        /* max-width: 400px; */
        height: 200px;
        margin-top: 1rem;
    }
    .center {
        display: flex;
        justify-content: center;
    }

    .uploadContainer {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        padding: 0.25rem;
        margin-top: 1rem;
        border-width: 2px;
        border-style: dotted;
        border-color: #d2d6dc;
        border-radius: 0.5rem;
        width: 100%;
    }

    .header {
        margin-top: 0.5rem;
    }

    .drag-file {
        display: inline-block;
    }

    .mt {
        margin-top: 1rem;
    }

    .file-input-button {
        padding: 0.25rem 1rem;
        color: #fff;
        background-color: #8b5cf6;
        border: 0;
        border-radius: 9999px;
    }

    .file-input-button:hover {
        background-color: #7c3aed;
    }

    .small-text {
        margin-top: 1rem;
        color: #a0aec0;
        font-size: 0.875rem;
    }

    .file-input {
        display: none;
    }
</style>
