"use strict";

/* =========================================================
   CAMLI TOOLS
   COMPLETE REBUILD
   ========================================================= */


/* =========================================================
   DATA
   ========================================================= */

const CAMLI = {

    storage: {

        emotion: "camliDetectedEmotion",

        presets: "camliToolPresets",

        timer: "camliSharedTimer"

    },


    sounds: [

        "Distant Storm",
        "Crickets",
        "Waterfall",
        "Pink Noise",
        "Brown Noise",
        "White Noise",
        "Fan",
        "Cafe",
        "Night Ambience",
        "Birds",
        "Fireplace",
        "Night Forest",
        "Wind",
        "Forest",
        "River",
        "Ocean",
        "Gentle Waves",
        "Thunderstorm",
        "Heavy Rain",
        "Rain"

    ],


    breathing: {

        calm: {

            name: "Calm",

            description:
                "Slow and gentle. Inhale 4, hold 2, exhale 6.",

            phases: [

                {
                    name: "Inhale",
                    seconds: 4,
                    className: "inhale"
                },

                {
                    name: "Hold",
                    seconds: 2,
                    className: "hold-in"
                },

                {
                    name: "Exhale",
                    seconds: 6,
                    className: "exhale"
                }

            ]

        },


        box: {

            name: "Box Breathing",

            description:
                "Balanced 4-second inhale, hold, exhale and hold.",

            phases: [

                {
                    name: "Inhale",
                    seconds: 4,
                    className: "inhale"
                },

                {
                    name: "Hold",
                    seconds: 4,
                    className: "hold-in"
                },

                {
                    name: "Exhale",
                    seconds: 4,
                    className: "exhale"
                },

                {
                    name: "Hold",
                    seconds: 4,
                    className: "hold-out"
                }

            ]

        },


        sleep: {

            name: "Sleep",

            description:
                "A slower 4-7-8 rhythm for a quiet wind-down.",

            phases: [

                {
                    name: "Inhale",
                    seconds: 4,
                    className: "inhale"
                },

                {
                    name: "Hold",
                    seconds: 7,
                    className: "hold-in"
                },

                {
                    name: "Exhale",
                    seconds: 8,
                    className: "exhale"
                }

            ]

        },


        focus: {

            name: "Focus",

            description:
                "Simple 4-second inhale and exhale.",

            phases: [

                {
                    name: "Inhale",
                    seconds: 4,
                    className: "inhale"
                },

                {
                    name: "Exhale",
                    seconds: 4,
                    className: "exhale"
                }

            ]

        }

    },


    emotionQuestions: [

        {

            text:
                "How does your mind feel right now?",

            options: [

                ["calm", "Quiet and settled"],

                ["focused", "Clear and locked in"],

                ["stressed", "Busy or pressured"],

                ["sad", "Heavy or low"],

                ["tired", "Slow or drained"],

                ["energetic", "Full of energy"]

            ]

        },


        {

            text:
                "What do you most want to do right now?",

            options: [

                ["calm", "Sit quietly"],

                ["focused", "Get something done"],

                ["stressed", "Escape the pressure"],

                ["sad", "Be alone for a while"],

                ["tired", "Rest"],

                ["energetic", "Move or create"]

            ]

        },


        {

            text:
                "How is your body feeling?",

            options: [

                ["calm", "Loose"],

                ["focused", "Steady"],

                ["stressed", "Tense"],

                ["sad", "Heavy"],

                ["tired", "Low-energy"],

                ["energetic", "Restless"]

            ]

        },


        {

            text:
                "What is your attention doing?",

            options: [

                ["calm", "Moving slowly"],

                ["focused", "Staying on one thing"],

                ["stressed", "Jumping everywhere"],

                ["sad", "Hard to care"],

                ["tired", "Fading"],

                ["energetic", "Moving quickly"]

            ]

        },


        {

            text:
                "What would help most?",

            options: [

                ["calm", "A peaceful atmosphere"],

                ["focused", "Background focus"],

                ["stressed", "Release"],

                ["sad", "Gentleness"],

                ["tired", "Sleepiness"],

                ["energetic", "A productive outlet"]

            ]

        },


        {

            text:
                "Pick the sentence that fits best.",

            options: [

                ["calm", "I feel okay where I am."],

                ["focused", "I know what I need to do."],

                ["stressed", "I need things to slow down."],

                ["sad", "I need a softer moment."],

                ["tired", "I need to recharge."],

                ["energetic", "I want to use this energy."]

            ]

        }

    ],


    emotionInfo: {

        calm: {

            title: "Calm",

            text:
                "Keep the low-stimulation rhythm going.",

            breathing: "calm",

            sound: "White Noise"

        },


        focused: {

            title: "Focused",

            text:
                "Protect the attention you already have.",

            breathing: "focus",

            sound: "Forest"

        },


        stressed: {

            title: "Stressed",

            text:
                "Slow the body down before asking more from your mind.",

            breathing: "calm",

            sound: "Rain"

        },


        sad: {

            title: "Low / Sad",

            text:
                "Choose something gentle and give yourself a quiet reset.",

            breathing: "calm",

            sound: "Ocean"

        },


        tired: {

            title: "Tired",

            text:
                "Lower stimulation and let your pace become slower.",

            breathing: "sleep",

            sound: "Night Ambience"

        },


        energetic: {

            title: "Energetic",

            text:
                "Use the energy deliberately instead of adding more stimulation.",

            breathing: "focus",

            sound: "Forest"

        }

    },


    ambientPresets: {

        Rain: [

            ["Rain", .65],

            ["Gentle Waves", .35]

        ],


        Forest: [

            ["Forest", .65],

            ["Birds", .35]

        ],


        Storm: [

            ["Thunderstorm", .65],

            ["Distant Storm", .35]

        ],


        Cafe: [

            ["Cafe", .70],

            ["Fan", .30]

        ]

    },


    magicPresets: {

        calm: {

            breathing: true,

            style: "calm",

            sounds: [

                ["White Noise", .60],

                ["Wind", .40]

            ]

        },


        focus: {

            breathing: true,

            style: "focus",

            sounds: [

                ["Forest", .75],

                ["Rain", .25]

            ]

        },


        sleep: {

            breathing: true,

            style: "sleep",

            sounds: [

                ["Fireplace", .70],

                ["Ocean", .30]

            ]

        },


        relax: {

            breathing: true,

            style: "calm",

            sounds: [

                ["Forest", .45],

                ["Wind", .55]

            ]

        }

    }

};



/* =========================================================
   STATE
   ========================================================= */

const state = {

    selectedBreathing: "calm",


    breathing: {

        running: false,

        phaseIndex: 0,

        remaining: 0,

        interval: null,

        pendingStyle: null

    },


    audio: new Map(),


    masterVolume: 1,


    timer: {

        total: 300,

        remaining: 300,

        running: false,

        interval: null

    }

};



/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);


async function init() {

    await loadSharedFragments();

    applySavedThemeFallback();


    renderBreathingStyles();

    renderBreathingStyleSelect();

    renderSoundCards();

    renderAmbientBuilder();

    renderMagicBuilder();

    renderEmotionQuestions();

    renderSavedPresets();


    restoreEmotion();

    restoreTimer();


    bindEvents();


    updateBreathingUI();

    updateTimerUI();

    updateAudioBar();

}



/* =========================================================
   NAVBAR / MODE LOADING
   ========================================================= */

async function loadSharedFragments() {

    const jobs = [];


    const navbar =
        document.getElementById("navbar");


    if (navbar) {

        jobs.push(

            fetch("navbar.html")

                .then(response => {

                    if (!response.ok) {

                        throw new Error(
                            "Navbar failed"
                        );

                    }

                    return response.text();

                })

                .then(html => {

                    navbar.innerHTML = html;

                })

                .catch(error => {

                    console.warn(
                        "Navbar could not be loaded:",
                        error
                    );

                })

        );

    }


    const modeChanger =
        document.getElementById("mode-changer");


    if (modeChanger) {

        jobs.push(

            fetch("mode-changer.html")

                .then(response => {

                    if (!response.ok) {

                        throw new Error(
                            "Mode changer failed"
                        );

                    }

                    return response.text();

                })

                .then(html => {

                    modeChanger.innerHTML = html;

                })

                .catch(error => {

                    console.warn(
                        "Mode changer could not be loaded:",
                        error
                    );

                })

        );

    }


    await Promise.all(jobs);

}



function applySavedThemeFallback() {

    try {

        const saved =
            localStorage.getItem(
                "camliTheme"
            );


        if (saved === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

        }


        if (saved === "light") {

            document.body.classList.remove(
                "dark-mode"
            );

        }

    } catch (_) {}

}



/* =========================================================
   EVENTS
   ========================================================= */

function bindEvents() {


    document.addEventListener(
        "click",
        handleGlobalClick
    );


    document.getElementById(
        "breathing-start"
    ).addEventListener(
        "click",
        () => {

            if (
                state.breathing.running
            ) {

                pauseBreathing();

            } else {

                startBreathing(
                    state.selectedBreathing
                );

            }

        }
    );


    document.getElementById(
        "breathing-reset"
    ).addEventListener(
        "click",
        resetBreathing
    );


    document.getElementById(
        "breathing-confirm"
    ).addEventListener(
        "click",
        confirmBreathingChange
    );


    document.getElementById(
        "breathing-cancel"
    ).addEventListener(
        "click",
        cancelBreathingChange
    );


    document.getElementById(
        "breathing-modal-close"
    ).addEventListener(
        "click",
        cancelBreathingChange
    );


    document.getElementById(
        "detect-emotion"
    ).addEventListener(
        "click",
        detectEmotion
    );


    document.getElementById(
        "detect-emotion-top"
    ).addEventListener(
        "click",
        detectEmotion
    );


    document.getElementById(
        "clear-emotion"
    ).addEventListener(
        "click",
        clearEmotion
    );


    document.getElementById(
        "clear-emotion-top"
    ).addEventListener(
        "click",
        clearEmotion
    );


    document.getElementById(
        "recommend-breathe"
    ).addEventListener(
        "click",
        startRecommendedBreathing
    );


    document.getElementById(
        "recommend-sound"
    ).addEventListener(
        "click",
        playRecommendedSound
    );


    document.getElementById(
        "timer-start"
    ).addEventListener(
        "click",
        toggleTimer
    );


    document.getElementById(
        "timer-reset"
    ).addEventListener(
        "click",
        resetTimer
    );


    document.getElementById(
        "timer-preset"
    ).addEventListener(
        "change",
        changeTimerPreset
    );


    document.getElementById(
        "stop-all-sounds-top"
    ).addEventListener(
        "click",
        stopAllAudio
    );


    document.getElementById(
        "audio-main-toggle"
    ).addEventListener(
        "click",
        toggleAllAudio
    );


    document.getElementById(
        "audio-stop"
    ).addEventListener(
        "click",
        stopAllAudio
    );


    document.getElementById(
        "audio-make-preset"
    ).addEventListener(
        "click",
        openCurrentAudioPresetModal
    );


    document.getElementById(
        "audio-mixer"
    ).addEventListener(
        "click",
        openMixer
    );


    document.getElementById(
        "mixer-close"
    ).addEventListener(
        "click",
        closeMixer
    );


    document.getElementById(
        "master-volume"
    ).addEventListener(
        "input",
        changeMasterVolume
    );


    document.getElementById(
        "save-ambient-preset"
    ).addEventListener(
        "click",
        saveAmbientPreset
    );


    document.getElementById(
        "save-magic-preset"
    ).addEventListener(
        "click",
        saveMagicPreset
    );


    document.getElementById(
        "preset-modal-close"
    ).addEventListener(
        "click",
        closeCurrentAudioPresetModal
    );


    document.getElementById(
        "preset-modal-cancel"
    ).addEventListener(
        "click",
        closeCurrentAudioPresetModal
    );


    document.getElementById(
        "preset-modal-save"
    ).addEventListener(
        "click",
        saveCurrentAudioPreset
    );


    document.getElementById(
        "magic-breathing"
    ).addEventListener(
        "change",
        updateMagicBreathingVisibility
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeBreathingModal();

                closeCurrentAudioPresetModal();

                closeMixer();

            }

        }
    );

}



/* =========================================================
   GLOBAL CLICK HANDLER
   ========================================================= */

function handleGlobalClick(event) {


    const styleButton =
        event.target.closest(
            "[data-breath-style]"
        );


    if (styleButton) {

        requestBreathingStyle(
            styleButton.dataset.breathStyle
        );

        return;

    }


    const soundButton =
        event.target.closest(
            "[data-sound-toggle]"
        );


    if (soundButton) {

        toggleSound(
            soundButton.dataset.soundToggle
        );

        return;

    }


    const soundVolume =
        event.target.closest(
            "[data-sound-volume]"
        );


    if (soundVolume) {

        const name =
            soundVolume.dataset.soundVolume;


        setSoundBaseVolume(
            name,
            Number(
                soundVolume.value
            ) / 100
        );

        return;

    }


    const ambientButton =
        event.target.closest(
            "[data-ambient-preset]"
        );


    if (ambientButton) {

        playAmbientPreset(
            ambientButton.dataset.ambientPreset
        );

        return;

    }


    const magicButton =
        event.target.closest(
            "[data-magic]"
        );


    if (magicButton) {

        playMagicPreset(
            magicButton.dataset.magic
        );

        return;

    }


    const playSaved =
        event.target.closest(
            "[data-play-saved]"
        );


    if (playSaved) {

        playSavedPreset(
            playSaved.dataset.playSaved
        );

        return;

    }


    const deleteSaved =
        event.target.closest(
            "[data-delete-saved]"
        );


    if (deleteSaved) {

        deleteSavedPreset(
            deleteSaved.dataset.deleteSaved
        );

        return;

    }


    const magicCheck =
        event.target.closest(
            "[data-magic-check]"
        );


    if (magicCheck) {

        enforceMagicSoundLimit(
            magicCheck
        );

    }

}



/* =========================================================
   BREATHING
   ========================================================= */

function renderBreathingStyles() {

    const holder =
        document.getElementById(
            "breathing-style-list"
        );


    holder.innerHTML = "";


    Object.entries(
        CAMLI.breathing
    ).forEach(
        ([key, style]) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "breath-style";

            button.dataset.breathStyle =
                key;


            button.innerHTML = `

                <strong>
                    ${escapeHtml(style.name)}
                </strong>

                <span>
                    ${escapeHtml(style.description)}
                </span>

            `;


            holder.appendChild(
                button
            );

        }
    );

}



function renderBreathingStyleSelect() {

    const select =
        document.getElementById(
            "magic-breathing-style"
        );


    select.innerHTML = "";


    Object.entries(
        CAMLI.breathing
    ).forEach(
        ([key, style]) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value = key;

            option.textContent =
                style.name;


            select.appendChild(
                option
            );

        }
    );


    select.value =
        state.selectedBreathing;

}



function requestBreathingStyle(
    styleKey
) {

    if (
        !CAMLI.breathing[styleKey]
    ) {

        return;

    }


    if (
        state.breathing.running
    ) {

        state.breathing.pendingStyle =
            styleKey;

        openBreathingModal();

        return;

    }


    state.selectedBreathing =
        styleKey;


    updateBreathingUI();

}



function openBreathingModal() {

    const modal =
        document.getElementById(
            "breathing-modal"
        );


    modal.hidden = false;

    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        () => {

            document
                .getElementById(
                    "breathing-confirm"
                )
                .focus();

        },
        0
    );

}



function closeBreathingModal() {

    document.getElementById(
        "breathing-modal"
    ).hidden = true;

    document.body.classList.remove(
        "modal-open"
    );

}



function cancelBreathingChange() {

    state.breathing.pendingStyle =
        null;

    closeBreathingModal();

}



function confirmBreathingChange() {

    const next =
        state.breathing.pendingStyle;


    if (!next) {

        closeBreathingModal();

        return;

    }


    stopBreathing(false);


    state.selectedBreathing =
        next;


    state.breathing.pendingStyle =
        null;


    closeBreathingModal();


    startBreathing(next);

}



function startBreathing(
    styleKey,
    options = {}
) {

    const style =
        CAMLI.breathing[styleKey];


    if (!style) {

        return;

    }


    if (
        state.breathing.running &&
        !options.force
    ) {

        requestBreathingStyle(
            styleKey
        );

        return;

    }


    if (options.force) {

        stopBreathing(false);

    }


    state.selectedBreathing =
        styleKey;


    state.breathing.running =
        true;


    state.breathing.phaseIndex =
        0;


    state.breathing.remaining =
        style.phases[0].seconds;


    clearInterval(
        state.breathing.interval
    );


    state.breathing.interval =
        setInterval(
            tickBreathing,
            1000
        );


    updateBreathingUI();

}



function pauseBreathing() {

    if (
        !state.breathing.running
    ) {

        return;

    }


    state.breathing.running =
        false;


    clearInterval(
        state.breathing.interval
    );


    state.breathing.interval =
        null;


    updateBreathingUI();

}



function stopBreathing(
    showReady = true
) {

    clearInterval(
        state.breathing.interval
    );


    state.breathing.interval =
        null;


    state.breathing.running =
        false;


    state.breathing.phaseIndex =
        0;


    state.breathing.remaining =
        0;


    if (showReady) {

        updateBreathingUI();

    }

}



function resetBreathing() {

    stopBreathing(true);

    state.breathing.pendingStyle =
        null;

}



function tickBreathing() {

    if (
        !state.breathing.running
    ) {

        return;

    }


    state.breathing.remaining -= 1;


    if (
        state.breathing.remaining <= 0
    ) {

        const phases =
            CAMLI.breathing[
                state.selectedBreathing
            ].phases;


        state.breathing.phaseIndex =
            (
                state.breathing.phaseIndex +
                1
            ) % phases.length;


        state.breathing.remaining =
            phases[
                state.breathing.phaseIndex
            ].seconds;

    }


    updateBreathingUI();

}



function updateBreathingUI() {

    const style =
        CAMLI.breathing[
            state.selectedBreathing
        ];


    const orb =
        document.getElementById(
            "breathing-orb"
        );


    const phase =
        document.getElementById(
            "breathing-phase"
        );


    const countdown =
        document.getElementById(
            "breathing-countdown"
        );


    const stateLabel =
        document.getElementById(
            "breathing-state"
        );


    const selectedName =
        document.getElementById(
            "selected-breathing-name"
        );


    const startButton =
        document.getElementById(
            "breathing-start"
        );


    selectedName.textContent =
        style.name;


    document
        .querySelectorAll(
            "[data-breath-style]"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.breathStyle ===
                    state.selectedBreathing
                );

            }
        );


    const magicSelect =
        document.getElementById(
            "magic-breathing-style"
        );


    if (magicSelect) {

        magicSelect.value =
            state.selectedBreathing;

    }


    orb.classList.remove(
        "inhale",
        "hold-in",
        "exhale",
        "hold-out"
    );


    if (
        !state.breathing.running
    ) {

        phase.textContent =
            "Ready";

        countdown.textContent =
            "--";

        stateLabel.textContent =
            "Not running";

        startButton.textContent =
            "Start";

        return;

    }


    const current =
        style.phases[
            state.breathing.phaseIndex
        ];


    orb.classList.add(
        current.className
    );


    phase.textContent =
        current.name;


    countdown.textContent =
        String(
            state.breathing.remaining
        );


    stateLabel.textContent =
        "Running";


    startButton.textContent =
        "Pause";

}



/* =========================================================
   SOUND CARDS
   ========================================================= */

function renderSoundCards() {

    const grid =
        document.getElementById(
            "sound-grid"
        );


    grid.innerHTML = "";


    CAMLI.sounds.forEach(
        name => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "sound-card";


            card.dataset.soundCard =
                name;


            card.innerHTML = `

                <div class="sound-card-top">

                    <span class="sound-name">
                        ${escapeHtml(name)}
                    </span>

                    <button
                        class="sound-toggle"
                        type="button"
                        data-sound-toggle="${escapeAttr(name)}"
                        aria-label="Play ${escapeAttr(name)}"
                    >
                        ▶
                    </button>

                </div>


                <input
                    class="sound-volume"
                    type="range"
                    min="0"
                    max="100"
                    value="60"
                    data-sound-volume="${escapeAttr(name)}"
                    aria-label="${escapeAttr(name)} volume"
                >

            `;


            grid.appendChild(
                card
            );

        }
    );

}



/* =========================================================
   AUDIO CREATION
   ========================================================= */

function createAudioEntry(name) {

    if (
        state.audio.has(name)
    ) {

        return state.audio.get(name);

    }


    const audio =
        new Audio();


    audio.loop =
        true;


    audio.preload =
        "auto";


    const entry = {

        name,

        audio,

        baseVolume: .60,

        failed: false,

        sourceIndex: 0,

        sources:
            buildAudioSources(name)

    };


    audio.volume =
        entry.baseVolume *
        state.masterVolume;


    audio.addEventListener(
        "ended",
        () => {

            audio.currentTime =
                0;

        }
    );


    audio.addEventListener(
        "error",
        () => {

            tryNextAudioSource(
                entry
            );

        }
    );


    state.audio.set(
        name,
        entry
    );


    audio.src =
        entry.sources[0];


    return entry;

}



/* =========================================================
   AUDIO SOURCE RESOLUTION
   ========================================================= */

function buildAudioSources(name) {

    const normalized =
        name
            .toLowerCase()
            .replace(
                /[’']/g,
                ""
            )
            .trim();


    const variants =
        new Set([

            name,

            normalized,

            normalized.replace(
                /\s+/g,
                "-"
            ),

            normalized.replace(
                /\s+/g,
                "_"
            ),

            normalized.replace(
                /\s+/g,
                ""
            )

        ]);


    const extensions = [

        ".mp3",
        ".wav",
        ".ogg"

    ];


    const paths = [];


    for (
        const variant of variants
    ) {

        for (
            const extension of extensions
        ) {

            const path =
                `audio/ambient/${variant}${extension}`;


            if (
                !paths.includes(path)
            ) {

                paths.push(path);

            }

        }

    }


    return paths;

}



function tryNextAudioSource(
    entry
) {

    if (
        entry.sourceIndex >=
        entry.sources.length - 1
    ) {

        entry.failed =
            true;


        updateAudioBar();

        return;

    }


    entry.sourceIndex += 1;


    entry.audio.src =
        entry.sources[
            entry.sourceIndex
        ];


    entry.audio.load();

}



/* =========================================================
   PLAY SOUND
   ========================================================= */

async function playSound(
    name,
    volume = null
) {

    if (
        !CAMLI.sounds.includes(name)
    ) {

        return;

    }


    const entry =
        createAudioEntry(name);


    if (
        volume !== null
    ) {

        entry.baseVolume =
            clamp(
                volume,
                0,
                1
            );


        updateSoundVolumeInput(
            name
        );

    }


    entry.failed =
        false;


    entry.audio.volume =
        entry.baseVolume *
        state.masterVolume;


    try {

        await entry.audio.play();


        markSoundCard(
            name
        );


        updateAudioBar();

        renderMixer();

    }


    catch (error) {

        entry.failed =
            true;


        showToast(
            `Could not play ${name}. Check the file name and audio/ambient folder.`,
            true
        );


        updateAudioBar();

    }

}



/* =========================================================
   SOUND TOGGLE
   ========================================================= */

function toggleSound(name) {

    const entry =
        state.audio.get(name);


    if (
        !entry ||
        entry.audio.paused
    ) {

        playSound(name);

    }

    else {

        entry.audio.pause();

        markSoundCard(name);

        updateAudioBar();

        renderMixer();

    }

}



/* =========================================================
   SOUND VOLUME
   ========================================================= */

function setSoundBaseVolume(
    name,
    value
) {

    let entry =
        state.audio.get(name);


    if (!entry) {

        entry =
            createAudioEntry(name);

    }


    entry.baseVolume =
        clamp(
            value,
            0,
            1
        );


    entry.audio.volume =
        entry.baseVolume *
        state.masterVolume;


    updateSoundVolumeInput(
        name
    );


    renderMixer();

}



function updateSoundVolumeInput(
    name
) {

    const input =
        document.querySelector(
            `[data-sound-volume="${CSS.escape(name)}"]`
        );


    const entry =
        state.audio.get(name);


    if (
        input &&
        entry
    ) {

        input.value =
            String(
                Math.round(
                    entry.baseVolume *
                    100
                )
            );

    }

}



/* =========================================================
   SOUND CARD STATE
   ========================================================= */

function markSoundCard(name) {

    const card =
        document.querySelector(
            `[data-sound-card="${CSS.escape(name)}"]`
        );


    const entry =
        state.audio.get(name);


    if (
        !card ||
        !entry
    ) {

        return;

    }


    const playing =
        !entry.audio.paused &&
        !entry.failed;


    card.classList.toggle(
        "playing",
        playing
    );


    const button =
        card.querySelector(
            "[data-sound-toggle]"
        );


    if (button) {

        button.textContent =
            playing
                ? "Ⅱ"
                : "▶";

    }

}



/* =========================================================
   AUDIO STATE
   ========================================================= */

function playingEntries() {

    return [

        ...state.audio.values()

    ].filter(
        entry =>
            !entry.audio.paused &&
            !entry.audio.ended &&
            !entry.failed
    );

}



/* =========================================================
   PAUSE ALL
   ========================================================= */

function pauseAllAudio() {

    state.audio.forEach(
        entry => {

            entry.audio.pause();

        }
    );


    updateAllSoundCards();

    updateAudioBar();

    renderMixer();

}



/* =========================================================
   STOP ALL
   ========================================================= */

function stopAllAudio() {

    state.audio.forEach(
        entry => {

            entry.audio.pause();

            try {

                entry.audio.currentTime =
                    0;

            } catch (_) {}

        }
    );


    updateAllSoundCards();

    updateAudioBar();

    renderMixer();

}



/* =========================================================
   RESUME ALL
   ========================================================= */

function resumeAllAudio() {

    const entries =
        [
            ...state.audio.values()
        ];


    if (
        !entries.length
    ) {

        showToast(
            "Play a sound first."
        );

        return;

    }


    entries.forEach(
        entry => {

            entry.failed =
                false;


            entry.audio.volume =
                entry.baseVolume *
                state.masterVolume;


            entry.audio
                .play()
                .catch(
                    () => {}
                );

        }
    );


    setTimeout(
        () => {

            updateAllSoundCards();

            updateAudioBar();

            renderMixer();

        },
        100
    );

}



/* =========================================================
   MAIN AUDIO BAR TOGGLE
   ========================================================= */

function toggleAllAudio() {

    if (
        playingEntries().length > 0
    ) {

        pauseAllAudio();

    }

    else {

        resumeAllAudio();

    }

}



/* =========================================================
   AUDIO BAR
   ========================================================= */

function updateAudioBar() {

    const bar =
        document.getElementById(
            "audio-bar"
        );


    const main =
        document.getElementById(
            "audio-main-toggle"
        );


    const mixer =
        document.getElementById(
            "audio-mixer"
        );


    const count =
        document.getElementById(
            "audio-count"
        );


    const entries =
        [
            ...state.audio.values()
        ];


    bar.hidden =
        entries.length === 0;


    const active =
        playingEntries().length;


    const loaded =
        entries.filter(
            entry =>
                !entry.failed
        ).length;


    main.textContent =
        active > 0
            ? "Ⅱ"
            : "▶";


    mixer.disabled =
        active <= 1;


    count.textContent =
        `${active} playing` +
        (
            loaded > active
                ? ` • ${loaded} loaded`
                : ""
        );


    updateAllSoundCards();

}



/* =========================================================
   UPDATE ALL CARDS
   ========================================================= */

function updateAllSoundCards() {

    CAMLI.sounds.forEach(
        markSoundCard
    );

}



/* =========================================================
   MIXER
   ========================================================= */

function openMixer() {

    if (
        playingEntries().length <= 1
    ) {

        return;

    }


    const panel =
        document.getElementById(
            "mixer-panel"
        );


    panel.classList.add(
        "open"
    );


    panel.setAttribute(
        "aria-hidden",
        "false"
    );


    renderMixer();

}



function closeMixer() {

    const panel =
        document.getElementById(
            "mixer-panel"
        );


    panel.classList.remove(
        "open"
    );


    panel.setAttribute(
        "aria-hidden",
        "true"
    );

}



function renderMixer() {

    const holder =
        document.getElementById(
            "mixer-list"
        );


    holder.innerHTML = "";


    const entries =
        [
            ...state.audio.values()
        ];


    if (
        !entries.length
    ) {

        holder.innerHTML =
            `
            <p class="helper">
                No sounds loaded yet.
            </p>
            `;

        return;

    }


    entries.forEach(
        entry => {

            const playing =
                !entry.audio.paused &&
                !entry.failed;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "mixer-entry";


            item.innerHTML = `

                <div class="mixer-entry-top">

                    <strong>
                        ${escapeHtml(entry.name)}
                    </strong>

                    <span class="helper">
                        ${
                            playing
                                ? "Playing"
                                : "Paused"
                        }
                    </span>

                </div>


                <input
                    type="range"
                    min="0"
                    max="100"
                    value="${Math.round(
                        entry.baseVolume * 100
                    )}"
                    data-mixer-volume="${escapeAttr(entry.name)}"
                >


                <div class="mixer-entry-actions">

                    <button
                        class="small-btn"
                        type="button"
                        data-mixer-toggle="${escapeAttr(entry.name)}"
                    >
                        ${
                            playing
                                ? "Pause"
                                : "Play"
                        }
                    </button>


                    <button
                        class="small-btn"
                        type="button"
                        data-mixer-stop="${escapeAttr(entry.name)}"
                    >
                        Stop
                    </button>

                </div>

            `;


            holder.appendChild(
                item
            );

        }
    );


    holder
        .querySelectorAll(
            "[data-mixer-volume]"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    () => {

                        setSoundBaseVolume(

                            input.dataset
                                .mixerVolume,

                            Number(
                                input.value
                            ) / 100

                        );

                    }
                );

            }
        );


    holder
        .querySelectorAll(
            "[data-mixer-toggle]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        toggleSound(
                            button.dataset
                                .mixerToggle
                        );

                    }
                );

            }
        );


    holder
        .querySelectorAll(
            "[data-mixer-stop]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        stopSingleSound(
                            button.dataset
                                .mixerStop
                        );

                    }
                );

            }
        );

}



function stopSingleSound(name) {

    const entry =
        state.audio.get(name);


    if (!entry) {

        return;

    }


    entry.audio.pause();


    try {

        entry.audio.currentTime =
            0;

    } catch (_) {}


    updateAudioBar();

    renderMixer();

}



/* =========================================================
   MASTER VOLUME
   ========================================================= */

function changeMasterVolume(
    event
) {

    state.masterVolume =
        Number(
            event.target.value
        ) / 100;


    document.getElementById(
        "master-volume-value"
    ).textContent =
        `${event.target.value}%`;


    state.audio.forEach(
        entry => {

            entry.audio.volume =
                entry.baseVolume *
                state.masterVolume;

        }
    );


    renderMixer();

}



/* =========================================================
   CURRENT AUDIO PRESET
   ========================================================= */

function openCurrentAudioPresetModal() {

    const names =
        playingEntries()
            .map(
                entry =>
                    entry.name
            );


    if (
        !names.length
    ) {

        showToast(
            "Play at least one audio first.",
            true
        );

        return;

    }


    if (
        names.length > 6
    ) {

        showToast(
            "You can save up to 6 sounds.",
            true
        );

        return;

    }


    document.getElementById(
        "current-audio-error"
    ).textContent = "";


    document.getElementById(
        "current-audio-preset-name"
    ).value = "";


    document.getElementById(
        "preset-modal"
    ).hidden = false;


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        () => {

            document.getElementById(
                "current-audio-preset-name"
            ).focus();

        },
        0
    );

}



function closeCurrentAudioPresetModal() {

    document.getElementById(
        "preset-modal"
    ).hidden = true;


    document.body.classList.remove(
        "modal-open"
    );

}



function saveCurrentAudioPreset() {

    const input =
        document.getElementById(
            "current-audio-preset-name"
        );


    const error =
        document.getElementById(
            "current-audio-error"
        );


    const name =
        input.value.trim();


    const names =
        playingEntries()
            .map(
                entry =>
                    entry.name
            );


    if (!name) {

        error.textContent =
            "Please enter a name for your preset.";

        return;

    }


    if (!names.length) {

        error.textContent =
            "Play at least one audio first.";

        return;

    }


    if (names.length > 6) {

        error.textContent =
            "You can save up to 6 sounds.";

        return;

    }


    if (
        presetNameExists(name)
    ) {

        error.textContent =
            "That preset name already exists. Choose another name.";

        return;

    }


    const preset = {

        id:
            createId(),

        name,

        type:
            "ambient",

        sounds:
            names.map(
                soundName => {

                    const entry =
                        state.audio.get(
                            soundName
                        );


                    return {

                        name:
                            soundName,

                        volume:
                            entry
                                ? entry.baseVolume
                                : .6

                    };

                }
            ),

        breathing: {

            enabled:
                false,

            style:
                "calm"

        }

    };


    savePresetObject(
        preset
    );


    renderSavedPresets();


    closeCurrentAudioPresetModal();


    showToast(
        "Preset saved."
    );

}



/* =========================================================
   PRESET STORAGE
   ========================================================= */

function getSavedPresets() {

    try {

        const raw =
            localStorage.getItem(
                CAMLI.storage.presets
            );


        const parsed =
            raw
                ? JSON.parse(raw)
                : [];


        return Array.isArray(
            parsed
        )
            ? parsed
            : [];

    }

    catch (_) {

        return [];

    }

}



function savePresetObject(
    preset
) {

    const presets =
        getSavedPresets();


    presets.push(
        preset
    );


    localStorage.setItem(

        CAMLI.storage.presets,

        JSON.stringify(
            presets
        )

    );

}



function deleteSavedPreset(
    id
) {

    const next =
        getSavedPresets()
            .filter(
                preset =>
                    preset.id !== id
            );


    localStorage.setItem(

        CAMLI.storage.presets,

        JSON.stringify(
            next
        )

    );


    renderSavedPresets();


    showToast(
        "Preset deleted."
    );

}



function presetNameExists(
    name
) {

    const normalized =
        name
            .trim()
            .toLowerCase();


    return getSavedPresets()
        .some(
            preset =>
                preset.name
                    .trim()
                    .toLowerCase() ===
                normalized
        );

}



/* =========================================================
   RENDER SAVED PRESETS
   ========================================================= */

function renderSavedPresets() {

    const presets =
        getSavedPresets();


    const ambient =
        document.getElementById(
            "saved-ambient-presets"
        );


    const magic =
        document.getElementById(
            "saved-magic-presets"
        );


    ambient.innerHTML = "";

    magic.innerHTML = "";


    const ambientPresets =
        presets.filter(
            preset =>
                preset.type ===
                "ambient"
        );


    const magicPresets =
        presets.filter(
            preset =>
                preset.type ===
                "magic"
        );


    renderPresetList(

        ambient,

        ambientPresets,

        "No saved ambient presets yet."

    );


    renderPresetList(

        magic,

        magicPresets,

        "No saved Magic Mixes yet."

    );

}



function renderPresetList(
    holder,
    presets,
    emptyText
) {

    if (
        !presets.length
    ) {

        holder.innerHTML = `

            <p class="helper">
                ${emptyText}
            </p>

        `;

        return;

    }


    presets.forEach(
        preset => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "saved-preset";


            const breathingText =
                preset.breathing &&
                preset.breathing.enabled

                    ? ` + ${
                        CAMLI
                            .breathing[
                                preset
                                    .breathing
                                    .style
                            ]?.name ||
                        "breathing"
                    }`

                    : "";


            item.innerHTML = `

                <div class="saved-preset-info">

                    <strong>
                        ${escapeHtml(
                            preset.name
                        )}
                    </strong>

                    <span>
                        ${
                            preset.sounds.length
                        }
                        sound${
                            preset.sounds.length === 1
                                ? ""
                                : "s"
                        }

                        ${breathingText}

                    </span>

                </div>


                <div class="saved-preset-actions">

                    <button
                        class="small-btn"
                        type="button"
                        data-play-saved="${escapeAttr(
                            preset.id
                        )}"
                    >
                        Play
                    </button>


                    <button
                        class="small-btn"
                        type="button"
                        data-delete-saved="${escapeAttr(
                            preset.id
                        )}"
                    >
                        Delete
                    </button>

                </div>

            `;


            holder.appendChild(
                item
            );

        }
    );

}



/* =========================================================
   PLAY SAVED PRESET
   ========================================================= */

function playSavedPreset(id) {

    const preset =
        getSavedPresets()
            .find(
                item =>
                    item.id === id
            );


    if (!preset) {

        return;

    }


    replaceSession();


    preset.sounds.forEach(
        sound => {

            playSound(
                sound.name,
                sound.volume
            );

        }
    );


    if (
        preset.breathing?.enabled
    ) {

        startBreathing(

            preset.breathing.style ||
            "calm",

            {
                force: true
            }

        );


        scrollToBreathing();

    }


    showToast(
        `${preset.name} started.`
    );

}



/* =========================================================
   REPLACE CURRENT SESSION
   ========================================================= */

function replaceSession() {

    stopAllAudio();


    state.audio.clear();


    stopBreathing(
        true
    );


    closeMixer();


    updateAudioBar();

}



/* =========================================================
   AMBIENT BUILDER
   ========================================================= */

function renderAmbientBuilder() {

    const holder =
        document.getElementById(
            "ambient-builder"
        );


    holder.innerHTML = "";


    CAMLI.sounds.forEach(
        name => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "builder-sound";


            item.innerHTML = `

                <label>

                    <input
                        type="checkbox"
                        data-ambient-check="${escapeAttr(name)}"
                    >

                    <span>
                        ${escapeHtml(name)}
                    </span>

                </label>


                <input
                    type="range"
                    min="0"
                    max="100"
                    value="60"
                    data-ambient-volume="${escapeAttr(name)}"
                >

            `;


            holder.appendChild(
                item
            );

        }
    );

}



/* =========================================================
   SAVE AMBIENT PRESET
   ========================================================= */

function saveAmbientPreset() {

    const nameInput =
        document.getElementById(
            "ambient-preset-name"
        );


    const error =
        document.getElementById(
            "ambient-save-error"
        );


    const name =
        nameInput.value.trim();


    const selected =
        [
            ...document.querySelectorAll(
                "[data-ambient-check]:checked"
            )
        ].map(
            input =>
                input.dataset
                    .ambientCheck
        );


    error.textContent = "";


    if (!name) {

        error.textContent =
            "Please enter a name for your preset.";

        return;

    }


    if (
        presetNameExists(name)
    ) {

        error.textContent =
            "That preset name already exists. Choose another name.";

        return;

    }


    if (
        !selected.length
    ) {

        error.textContent =
            "Select at least one sound.";

        return;

    }


    if (
        selected.length > 6
    ) {

        error.textContent =
            "You can save up to 6 sounds.";

        return;

    }


    const sounds =
        selected.map(
            soundName => {

                const input =
                    document.querySelector(
                        `[data-ambient-volume="${CSS.escape(
                            soundName
                        )}"]`
                    );


                return {

                    name:
                        soundName,

                    volume:
                        input
                            ? Number(
                                input.value
                            ) / 100

                            : .6

                };

            }
        );


    savePresetObject({

        id:
            createId(),

        name,

        type:
            "ambient",

        sounds,

        breathing: {

            enabled:
                false,

            style:
                "calm"

        }

    });


    nameInput.value = "";


    document
        .querySelectorAll(
            "[data-ambient-check]"
        )
        .forEach(
            input =>
                input.checked = false
        );


    renderSavedPresets();


    showToast(
        "Ambient preset saved."
    );

}



/* =========================================================
   MAGIC BUILDER
   ========================================================= */

function renderMagicBuilder() {

    const holder =
        document.getElementById(
            "magic-sound-list"
        );


    holder.innerHTML = "";


    CAMLI.sounds.forEach(
        name => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "magic-sound";


            item.innerHTML = `

                <div class="magic-sound-top">

                    <label>

                        <input
                            type="checkbox"
                            data-magic-check="${escapeAttr(name)}"
                        >

                        <span>
                            ${escapeHtml(name)}
                        </span>

                    </label>


                    <span
                        class="helper"
                        data-magic-percent="${escapeAttr(name)}"
                    >
                        60%
                    </span>

                </div>


                <input
                    type="range"
                    min="0"
                    max="100"
                    value="60"
                    data-magic-volume="${escapeAttr(name)}"
                >

            `;


            holder.appendChild(
                item
            );

        }
    );


    holder
        .querySelectorAll(
            "[data-magic-volume]"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    () => {

                        const label =
                            document.querySelector(
                                `[data-magic-percent="${CSS.escape(
                                    input.dataset
                                        .magicVolume
                                )}"]`
                            );


                        if (label) {

                            label.textContent =
                                `${input.value}%`;

                        }

                    }
                );

            }
        );


    updateMagicBreathingVisibility();

}



/* =========================================================
   MAGIC LIMIT
   ========================================================= */

function enforceMagicSoundLimit(
    changedInput
) {

    const selected =
        [
            ...document.querySelectorAll(
                "[data-magic-check]:checked"
            )
        ];


    if (
        selected.length > 6
    ) {

        changedInput.checked =
            false;


        showToast(
            "You can use up to 6 sounds in one Magic Mix.",
            true
        );

    }

}



/* =========================================================
   MAGIC BREATHING TOGGLE
   ========================================================= */

function updateMagicBreathingVisibility() {

    const enabled =
        document.getElementById(
            "magic-breathing"
        ).checked;


    const options =
        document.querySelector(
            ".magic-breathing-options"
        );


    options.style.opacity =
        enabled
            ? "1"
            : ".45";


    options.style.pointerEvents =
        enabled
            ? "auto"
            : "none";

}



/* =========================================================
   SAVE MAGIC PRESET
   ========================================================= */

function saveMagicPreset() {

    const nameInput =
        document.getElementById(
            "magic-preset-name"
        );


    const error =
        document.getElementById(
            "magic-save-error"
        );


    const name =
        nameInput.value.trim();


    const selected =
        [
            ...document.querySelectorAll(
                "[data-magic-check]:checked"
            )
        ];


    error.textContent = "";


    if (!name) {

        error.textContent =
            "Please enter a name for your preset.";

        return;

    }


    if (
        presetNameExists(name)
    ) {

        error.textContent =
            "That preset name already exists. Choose another name.";

        return;

    }


    if (
        !selected.length
    ) {

        error.textContent =
            "Select at least one sound.";

        return;

    }


    if (
        selected.length > 6
    ) {

        error.textContent =
            "You can save up to 6 sounds.";

        return;

    }


    const sounds =
        selected.map(
            input => {

                const soundName =
                    input.dataset
                        .magicCheck;


                const volumeInput =
                    document.querySelector(
                        `[data-magic-volume="${CSS.escape(
                            soundName
                        )}"]`
                    );


                return {

                    name:
                        soundName,

                    volume:
                        volumeInput
                            ? Number(
                                volumeInput.value
                            ) / 100

                            : .6

                };

            }
        );


    const enabled =
        document.getElementById(
            "magic-breathing"
        ).checked;


    const style =
        document.getElementById(
            "magic-breathing-style"
        ).value;


    savePresetObject({

        id:
            createId(),

        name,

        type:
            "magic",

        sounds,

        breathing: {

            enabled,

            style

        }

    });


    nameInput.value = "";


    document
        .querySelectorAll(
            "[data-magic-check]"
        )
        .forEach(
            input =>
                input.checked = false
        );


    renderSavedPresets();


    showToast(
        "Magic Mix saved."
    );

}



/* =========================================================
   BUILT-IN AMBIENT
   ========================================================= */

function playAmbientPreset(
    name
) {

    const sounds =
        CAMLI.ambientPresets[name];


    if (!sounds) {

        return;

    }


    replaceSession();


    sounds.forEach(
        ([soundName, volume]) => {

            playSound(
                soundName,
                volume
            );

        }
    );


    showToast(
        `${name} preset started.`
    );

}



/* =========================================================
   BUILT-IN MAGIC MIX
   ========================================================= */

function playMagicPreset(
    name
) {

    const preset =
        CAMLI.magicPresets[name];


    if (!preset) {

        return;

    }


    replaceSession();


    preset.sounds.forEach(
        ([soundName, volume]) => {

            playSound(
                soundName,
                volume
            );

        }
    );


    if (
        preset.breathing
    ) {

        startBreathing(

            preset.style,

            {
                force: true
            }

        );


        scrollToBreathing();

    }


    showToast(
        `${capitalize(name)} Magic Mix started.`
    );

}



/* =========================================================
   RECOMMENDATIONS
   ========================================================= */

function startRecommendedBreathing() {

    const detected =
        localStorage.getItem(
            CAMLI.storage.emotion
        );


    const info =
        CAMLI.emotionInfo[
            detected
        ] ||
        CAMLI.emotionInfo.calm;


    scrollToBreathing();


    if (
        state.breathing.running &&
        state.selectedBreathing !==
            info.breathing
    ) {

        requestBreathingStyle(
            info.breathing
        );

    }


    else if (
        !state.breathing.running
    ) {

        state.selectedBreathing =
            info.breathing;


        startBreathing(
            info.breathing
        );

    }

}



function playRecommendedSound() {

    const detected =
        localStorage.getItem(
            CAMLI.storage.emotion
        );


    const info =
        CAMLI.emotionInfo[
            detected
        ] ||
        CAMLI.emotionInfo.calm;


    scrollToSection(
        "sounds"
    );


    playSound(
        info.sound
    );

}



/* =========================================================
   SCROLLING
   ========================================================= */

function scrollToBreathing() {

    const section =
        document.getElementById(
            "gentle-breath"
        );


    section.classList.remove(
        "breathing-highlight"
    );


    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });


    setTimeout(
        () => {

            section.classList.add(
                "breathing-highlight"
            );

        },
        400
    );


    setTimeout(
        () => {

            section.classList.remove(
                "breathing-highlight"
            );

        },
        1700
    );

}



function scrollToSection(id) {

    document
        .getElementById(id)
        ?.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}



/* =========================================================
   EMOTION QUESTIONS
   ========================================================= */

function renderEmotionQuestions() {

    const form =
        document.getElementById(
            "emotion-form"
        );


    form.innerHTML = "";


    CAMLI.emotionQuestions.forEach(
        (question, index) => {

            const section =
                document.createElement(
                    "fieldset"
                );


            section.className =
                "emotion-question";


            section.innerHTML = `

                <h3>
                    ${index + 1}.
                    ${escapeHtml(
                        question.text
                    )}
                </h3>

            `;


            const options =
                document.createElement(
                    "div"
                );


            options.className =
                "emotion-options";


            question.options.forEach(
                ([emotion, text]) => {

                    const label =
                        document.createElement(
                            "label"
                        );


                    label.className =
                        "emotion-option";


                    const id =
                        `emotion-${index}-${emotion}`;


                    label.innerHTML = `

                        <input
                            id="${id}"
                            type="radio"
                            name="emotion-question-${index}"
                            value="${emotion}"
                        >

                        <span>
                            ${escapeHtml(text)}
                        </span>

                    `;


                    options.appendChild(
                        label
                    );

                }
            );


            section.appendChild(
                options
            );


            form.appendChild(
                section
            );

        }
    );

}



/* =========================================================
   EMOTION DETECTION
   ========================================================= */

function detectEmotion() {

    const answers = [];


    for (
        let i = 0;
        i < CAMLI.emotionQuestions.length;
        i++
    ) {

        const selected =
            document.querySelector(
                `input[name="emotion-question-${i}"]:checked`
            );


        if (!selected) {

            showToast(
                `Answer question ${i + 1} first.`,
                true
            );


            document
                .querySelectorAll(
                    ".emotion-question"
                )[i]
                ?.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });


            return;

        }


        answers.push(
            selected.value
        );

    }


    const scores =
        Object.fromEntries(

            Object.keys(
                CAMLI.emotionInfo
            ).map(
                key =>
                    [
                        key,
                        0
                    ]
            )

        );


    answers.forEach(
        emotion => {

            if (
                scores[emotion] !==
                undefined
            ) {

                scores[emotion] += 1;

            }

        }
    );


    let winner =
        Object.keys(
            scores
        )[0];


    Object.keys(
        scores
    ).forEach(
        emotion => {

            if (
                scores[emotion] >
                scores[winner]
            ) {

                winner =
                    emotion;

            }

        }
    );


    localStorage.setItem(

        CAMLI.storage.emotion,

        winner

    );


    updateEmotionUI(
        winner
    );


    showToast(
        `Mood detected: ${
            CAMLI
                .emotionInfo[
                    winner
                ].title
        }.`
    );

}



/* =========================================================
   RESTORE EMOTION
   ========================================================= */

function restoreEmotion() {

    const saved =
        localStorage.getItem(
            CAMLI.storage.emotion
        );


    if (
        saved &&
        CAMLI.emotionInfo[saved]
    ) {

        updateEmotionUI(
            saved
        );

    }

}



/* =========================================================
   CLEAR EMOTION
   ========================================================= */

function clearEmotion() {

    localStorage.removeItem(
        CAMLI.storage.emotion
    );


    document
        .querySelectorAll(
            "#emotion-form input[type='radio']"
        )
        .forEach(
            input =>
                input.checked = false
        );


    document.getElementById(
        "emotion-result-title"
    ).textContent =
        "Not detected";


    document.getElementById(
        "emotion-result-text"
    ).textContent =
        "Answer the questions and press Detect my mood.";


    document.getElementById(
        "emotion-status"
    ).textContent =
        "No mood detected yet.";


    document.getElementById(
        "recommendations"
    ).hidden = true;


    showToast(
        "Mood cleared. You can re-detect it."
    );

}



/* =========================================================
   UPDATE EMOTION UI
   ========================================================= */

function updateEmotionUI(
    emotion
) {

    const info =
        CAMLI.emotionInfo[
            emotion
        ];


    if (!info) {

        return;

    }


    document.getElementById(
        "emotion-result-title"
    ).textContent =
        info.title;


    document.getElementById(
        "emotion-result-text"
    ).textContent =
        info.text;


    document.getElementById(
        "emotion-status"
    ).textContent =
        `Current mood: ${info.title}`;


    document.getElementById(
        "recommendation-title"
    ).textContent =
        `${info.title} reset`;


    document.getElementById(
        "recommendation-text"
    ).textContent =

        `${info.text} ` +

        `Recommended breathing: ` +

        `${CAMLI.breathing[
            info.breathing
        ].name}. ` +

        `Recommended sound: ` +

        `${info.sound}.`;


    document.getElementById(
        "breathing-recommendation"
    ).textContent =

        `For ${info.title.toLowerCase()}, ` +

        `Camli recommends ` +

        `${CAMLI.breathing[
            info.breathing
        ].name}.`;


    document.getElementById(
        "recommendations"
    ).hidden = false;

}



/* =========================================================
   TIMER
   ========================================================= */

function restoreTimer() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    CAMLI.storage.timer
                ) ||
                "null"
            );


        if (
            saved &&
            Number.isFinite(
                saved.total
            )
        ) {

            state.timer.total =
                saved.total;


            state.timer.remaining =
                Number.isFinite(
                    saved.remaining
                )

                    ? saved.remaining

                    : saved.total;

        }

    }

    catch (_) {}


    document.getElementById(
        "timer-preset"
    ).value =
        String(
            state.timer.total
        );

}



function persistTimer() {

    localStorage.setItem(

        CAMLI.storage.timer,

        JSON.stringify({

            total:
                state.timer.total,

            remaining:
                state.timer.remaining

        })

    );

}



function changeTimerPreset(
    event
) {

    if (
        state.timer.running
    ) {

        showToast(
            "Pause or reset the timer before changing its duration.",
            true
        );


        event.target.value =
            String(
                state.timer.total
            );


        return;

    }


    state.timer.total =
        Number(
            event.target.value
        );


    state.timer.remaining =
        state.timer.total;


    persistTimer();

    updateTimerUI();

}



function toggleTimer() {

    if (
        state.timer.running
    ) {

        pauseTimer();

        return;

    }


    if (
        state.timer.remaining <= 0
    ) {

        state.timer.remaining =
            state.timer.total;

    }


    state.timer.running =
        true;


    clearInterval(
        state.timer.interval
    );


    state.timer.interval =
        setInterval(
            tickTimer,
            1000
        );


    updateTimerUI();

}



function pauseTimer() {

    state.timer.running =
        false;


    clearInterval(
        state.timer.interval
    );


    state.timer.interval =
        null;


    persistTimer();

    updateTimerUI();

}



function resetTimer() {

    pauseTimer();


    state.timer.remaining =
        state.timer.total;


    persistTimer();

    updateTimerUI();

}



function tickTimer() {

    if (
        !state.timer.running
    ) {

        return;

    }


    state.timer.remaining -= 1;


    if (
        state.timer.remaining <= 0
    ) {

        state.timer.remaining =
            0;


        pauseTimer();


        stopAllAudio();


        stopBreathing(
            true
        );


        showToast(
            "Timer finished. Your active reset has been stopped."
        );

    }


    persistTimer();

    updateTimerUI();

}



function updateTimerUI() {

    const seconds =
        Math.max(
            0,
            state.timer.remaining
        );


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        seconds % 60;


    document.getElementById(
        "timer-display"
    ).textContent =

        `${String(
            minutes
        ).padStart(2, "0")}:` +

        `${String(
            secs
        ).padStart(2, "0")}`;


    document.getElementById(
        "timer-start"
    ).textContent =

        state.timer.running

            ? "Pause"

            : "Start";

}



/* =========================================================
   TOASTS
   ========================================================= */

function showToast(
    message,
    error = false
) {

    const area =
        document.getElementById(
            "toast-area"
        );


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `toast${
            error
                ? " error"
                : ""
        }`;


    toast.textContent =
        message;


    area.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },
        3500
    );

}



/* =========================================================
   HELPERS
   ========================================================= */

function createId() {

    return (

        `${Date.now()}-` +

        Math.random()
            .toString(36)
            .slice(2, 8)

    );

}



function clamp(
    value,
    min,
    max
) {

    return Math.min(
        max,
        Math.max(
            min,
            value
        )
    );

}



function capitalize(
    value
) {

    return (

        value.charAt(0)
            .toUpperCase() +

        value.slice(1)

    );

}



function escapeHtml(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}



function escapeAttr(
    value
) {

    return escapeHtml(
        value
    );

}



/* =========================================================
   GENERATED MIXER CONTROLS
   ========================================================= */

document.addEventListener(
    "input",
    event => {

        const mixerVolume =
            event.target.closest(
                "[data-mixer-volume]"
            );


        if (
            mixerVolume
        ) {

            setSoundBaseVolume(

                mixerVolume.dataset
                    .mixerVolume,

                Number(
                    mixerVolume.value
                ) / 100

            );

        }

    }
);



document.addEventListener(
    "click",
    event => {

        const mixerToggle =
            event.target.closest(
                "[data-mixer-toggle]"
            );


        if (
            mixerToggle
        ) {

            toggleSound(
                mixerToggle.dataset
                    .mixerToggle
            );

        }


        const mixerStop =
            event.target.closest(
                "[data-mixer-stop]"
            );


        if (
            mixerStop
        ) {

            stopSingleSound(
                mixerStop.dataset
                    .mixerStop
            );

        }

    }
);