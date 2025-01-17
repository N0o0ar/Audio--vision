document.addEventListener("DOMContentLoaded", () => {
    // Synchroniser les définitions avec les mots-clés
    const synchronizeDefinition = () => {
        const words = [
            { id: "transduction", definitionId: "definition-transduction" },
            { id: "sampling", definitionId: "definition-sampling" },
            { id: "opensource", definitionId: "definition-opensource" },
            { id: "java", definitionId: "definition-java" },
            { id: "sérendipité", definitionId: "definition-sérendipité" },
            { id: "midi", definitionId: "definition-midi" },
            { id: "ascii", definitionId: "definition-ascii" },
            { id: "texture", definitionId: "definition-texture" },
            { id: "polygone", definitionId: "definition-polygone" },
        ];

        const colonne3 = document.querySelector(".colonne3");
        const colonne2 = document.querySelector(".colonne2");

        words.forEach(({ id, definitionId }) => {
            const word = document.getElementById(id);
            const definition = document.getElementById(definitionId);

            if (word && definition) {
                const wordRect = word.getBoundingClientRect();
                const colonne3Rect = colonne3.getBoundingClientRect();
                const colonne2Rect = colonne2.getBoundingClientRect();

                const relativeTop = wordRect.top - colonne3Rect.top;

                let adjustedTop = relativeTop;
                if (adjustedTop < 0) {
                    adjustedTop = 0;
                }

                const maxBottom = colonne2Rect.height - definition.offsetHeight;
                if (adjustedTop > maxBottom) {
                    adjustedTop = maxBottom;
                }

                definition.style.top = `${adjustedTop}px`;
            }
        });
    };

    // Initialiser la synchronisation
    synchronizeDefinition();
    document.querySelector(".colonne3").addEventListener("scroll", synchronizeDefinition);
    window.addEventListener("resize", synchronizeDefinition);

    // Gestion des tooltips
    const tooltip = document.getElementById("image-tooltip");

    document.querySelectorAll(".black-square").forEach((square) => {
        square.addEventListener("mouseenter", (e) => {
            const imageUrls = square.getAttribute("data-image");
            const description = square.getAttribute("data-description");

            if (imageUrls) {
                tooltip.innerHTML = "";

                imageUrls.split(",").forEach((url) => {
                    const img = document.createElement("img");
                    img.src = url.trim();
                    img.style.maxWidth = "20vw";
                    img.style.maxHeight = "20vw";
                    img.style.marginBottom = "10px";
                    tooltip.appendChild(img);
                });

                if (description) {
                    const descElement = document.createElement("div");
                    descElement.className = "description";
                    descElement.textContent = description;
                    tooltip.appendChild(descElement);
                }

                tooltip.style.display = "flex";
                tooltip.style.flexDirection = "column";

                const tooltipWidth = tooltip.offsetWidth;
                const tooltipHeight = tooltip.offsetHeight;
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                let left = e.pageX + 10;
                let top = e.pageY + 10;

                if (left + tooltipWidth > windowWidth) {
                    left = e.pageX - tooltipWidth - 10;
                }

                if (top + tooltipHeight > windowHeight) {
                    top = e.pageY - tooltipHeight - 10;
                }

                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
            }
        });

        square.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    });

    // Gestion du défilement fluide pour le sommaire
    document.querySelectorAll('.sommaire a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gestion du basculement entre le contenu principal et la bibliographie
    const colonne3 = document.querySelector(".colonne3");
    const colonne2 = document.querySelector(".colonne2");
    const boutonRetourContainer = document.getElementById("bouton-retour-container");
    const bibliographyLink = document.getElementById("bibliography-link");

    // Sauvegarder le contenu initial des colonnes
    const originalContentColonne3 = colonne3.innerHTML;
    const originalContentColonne2 = colonne2.innerHTML;

    // Nouveau contenu pour la bibliographie
    const bibliographieContent = `
        <h2>Remerciements</h2>
        <p><br>Je tiens à remercier mes professeurs Émilie Del Pianta et Emmanuelle Pargala qui m’ont suivi durant l’écriture et la mise en forme de ma recherche. Merci aussi à ma famille qui a pu me soutenir jusqu’au bout. Je remercie aussi mon camarade Yann Arnold qui m’a beaucoup aidé pour le codage du site internet.</p>
        <h2>Bibliographie<br>Sitographie</h2>
        <p><br>Vidéos</p>
        <p><br>Divisional Articulations, Max Hattler, 24 mai 2017<br>
           https://vimeo.com/218815513</p>
        
        <p><br>Matrix III, John Withney, 1972<br>
           https://youtu.be/ZrKgyY5aDvA</p>

        <p><br>Experiments in motion graphics, John Whitney, 1968 <br>
           https://youtu.be/jIv-EcX9tUs?list=PLiEqVM_FOz8knUyIIX21IqaY2vsg8UXZy</p>

        <p><br>An Optical Poem, Oskar Fischinger, 1938<br>
           https://youtu.be/FcHsysPGSt0</p>
        
        <p><br>No Brain, Étienne de Crécy, produit par Fleur & Manu, 30 mars 2011<br>
           https://youtu.be/Z-3z3DNUGiE</p>
        
        <p><br>[Terry Riley's IN C] 11 oscillateurs et 53 formes, réalisé par Soia, Julien Sénélas et Jérôme Vassereau, 2 avril 2021<br>
           https://youtu.be/3AdKcD6lFh47</p>

        <p><br>Spirals, Jerobeam Fenderson, 5 octobre 2020<br>
           https://youtu.be/kPUdhm2VE-o</p>

        <p><br>T69 Collapse, Aphex Twin, réalisé par Weirdcore, 7 août 2018<br>
           https://youtu.be/SqayDnQ2wmw</p>

        <p><br>Outil pour DJ set, Superscript, présenté lors d’une conférence à l'exposition Morfosonic, octobre 2023<br>
           https://www.instagram.com/p/Cx-0nFAo99K/?img_index=1</p>

        
        <p><br>Stedelijk Vernacular of File Formats video, Rosa Menkman, 9 septembre 2020<br>
           https://vimeo.com/501518614</p>

        <p><br>Affiches, Musées</p>

        <p><br>Affiche Nuits Sonores 2023, 17 au 21 mai, Superscript2</p>

        <p><br>Morfosonic, musiques dessinées – Exposition, du 8 février au 6 juillet 2024, Médiathèque José Cabanis, à Toulouse, Studio Pépite</p>

        <p><br>Articles, Livres</p>

        <p><br>Bricolage, design, pratiques artistiques et numériques, Julien Bidoret – août 2014<br>
         https://www.accentgrave.net/bricoles/</p>
        
        <p><br>L’Audio-Vision, Son et image au cinéma, Michel Chion, Édition Armand Colin, 4e édition, 1990</p>

        <p><br>Dessiner les sons, Du son optique au son dessiné, Benoît Montigné, Audiographic Lab<br>
           https://www.audiographiclab.com/dessin</p>
        
        <p><br>À la découverte des sons visuels, Revue Hémisphère, Matthieu Ruf, publié en décembre 2021<br>
           https://revuehemispheres.ch/a-la-decouverte-des-sons-visuels/</p>

        <p><br>Symphonie de couleurs : l’audacieux projet de Scriabine, Les Clés de la Musique, cdlm, publié le 19 septembre 2024<br>
           https://lesclesdelamusique.fr/blog/symphonie-de-couleurs-scriabine/</p>
        
        <p><br>The Invisible Framework of Music and Images, L’Érudit, Volume 13, Numéro 3, Jean Piché, 2003<br>
           https://www.erudit.org/fr/revues/circuit/2003-v13-n3-circuit3615/902283ar.pdf</p>

        <p><br>After Effects ou la révolution de velour, Back Office, Lev Manovich, Traduit de l’anglais par Phœbe Hadjimarkos Clarke, Millenium Film Journal (no 45-46), 2006<br>
           http://www.revue-backoffice.com/numeros/04-suivre-le-mouvement/manovich-after-effects</p>

        <p><br><br><br><br><br><br><br><br><br><br><br><br>Recherche réalisée dans le cadre de la formation du DNMADE de Saint Étienne de Cahors, typographies utilisée : Sligoil-Micro pour les titres, CoFo Sans-Bold pour le corps de texte.</p>


















    `;

    // Fonction pour afficher la bibliographie
    const afficherBibliographie = () => {
        colonne3.innerHTML = bibliographieContent; // Remplace le contenu de colonne 3
        colonne2.innerHTML = ""; // Vide la colonne 2
        boutonRetourContainer.style.display = "block"; // Afficher le bouton Retour
    };

    // Fonction pour revenir au contenu principal
    const revenirAuContenuPrincipal = () => {
        colonne3.innerHTML = originalContentColonne3; // Restaurer le contenu initial de la colonne 3
        colonne2.innerHTML = originalContentColonne2; // Restaurer le contenu initial de la colonne 2
        boutonRetourContainer.style.display = "none"; // Cacher le bouton Retour
    };

    // Ajouter un gestionnaire d'événements pour le bouton Bibliographie
    bibliographyLink.addEventListener("click", afficherBibliographie);

    // Ajouter un gestionnaire d'événements pour le bouton Retour
    document.getElementById("bouton-retour").addEventListener("click", revenirAuContenuPrincipal);
});
