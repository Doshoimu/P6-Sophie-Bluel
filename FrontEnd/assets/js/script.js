// Appel fetch works
fetchWorks()
  .then(data => {

        // Sélection des éléments du DOM
        const portfolioSection = document.getElementById('portfolio');
        const gallery = portfolioSection.querySelector('.gallery');

        // Boucle sur les données de la notelist data
        data.forEach(project => {

            const { id, title, imageUrl, categoryId } = project;

            // Création des élément galerie principale
            const figure = document.createElement('figure');
            figure.dataset.category = categoryId;
            figure.dataset.projectId = id;


            const image = document.createElement('img');
            image.src = imageUrl;
            image.alt = title;


            const figcaption = document.createElement('figcaption');
            figcaption.textContent = title;

            // Ajout des éléments dans la galerie principal
            figure.appendChild(image);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);


            // Création des éléments galerie modale
            const modalGalleryDiv = document.createElement('div');
            modalGalleryDiv.style.position = 'relative';


            const modalGalleryImg = document.createElement('img');
            modalGalleryImg.src = imageUrl;
            modalGalleryImg.alt = title;

        });
    })
    .catch(error => {
    console.error('Erreur lors de la récupération des données des projets:', error);
});

// Appel fetch category
fetchCategory()
    .then(data => {

        // Sélection de l'élément DOM pour les liens de filtre
        const filterLinksContainer = document.querySelector('.filter__links');

        // Création du lien "Tous"
        const allLink = document.createElement("a");
        allLink.innerText = "Tous";
        allLink.classList.add("filters");
        allLink.dataset.category = "all";
        allLink.href = '#';
        
        // Ajout de l'élément allLink dans le parent
        filterLinksContainer.appendChild(allLink);

        // Boucle sur les données de la noteList data avec ça fonction fléché category
        data.forEach(category => {

            const categoryLink = document.createElement("a");

            categoryLink.innerText = category.name;
            categoryLink.dataset.category = category.id;
            categoryLink.classList.add("filters");
            categoryLink.href = '#';

            // Ajout de l'élément enfant dans le parent
            filterLinksContainer.appendChild(categoryLink);


            const selectUpload = document.querySelector('#category');

            // Création des options pour le menu déroulant de téléchargement
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;

            // Ajout de l'élément dans le selectUpload
            selectUpload.appendChild(option);
        });

        // Récupére l'élément du DOM
        const filterLinks = filterLinksContainer.querySelectorAll('.filters');

        // Boucle sur les donnée de la noteList filterlinks avec fonction fléché 
        filterLinks.forEach(link => {

            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Boucle sur les donnée de la noteList et on parcourt tous les liens de filtre et on leur enlève la classe "active".
                filterLinks.forEach(lnk => lnk.classList.remove('active'));

                // Le lien de filtre actuellement cliqué se voit attribuer la classe "active".
                this.classList.add('active');
                
                // Filtrage des projets en fonction de la catégorie sélectionnée
                const selectedCategory = this.dataset.category;
                filterProjects(selectedCategory);
            });
        });
    })
    .catch(error => {
    console.error('Erreur lors de la récupération des données des catégories:', error);
});