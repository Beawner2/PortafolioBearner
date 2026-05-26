document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-img');
            const modalCaption = document.getElementById('modal-caption');
            const closeModal = document.querySelector('.close-modal');
            const prevBtn = document.getElementById('carousel-prev');
            const nextBtn = document.getElementById('carousel-next');

            let currentImagesArray = [];
            let currentImageIndex = 0;

            const openModal = (images, title, desc) => {
                if (Array.isArray(images) && images.length > 1) {
                    currentImagesArray = images;
                    currentImageIndex = 0;
                    modalImg.src = currentImagesArray[currentImageIndex];
                    prevBtn.style.display = 'block';
                    nextBtn.style.display = 'block';
                } else {
                    currentImagesArray = [];
                    modalImg.src = Array.isArray(images) ? images[0] : images;
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                }
                
                modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            };

            const changeCarouselImage = (direction) => {
                if (currentImagesArray.length <= 1) return;
                
                currentImageIndex += direction;
                
                if (currentImageIndex >= currentImagesArray.length) currentImageIndex = 0;
                if (currentImageIndex < 0) currentImageIndex = currentImagesArray.length - 1;
                
                modalImg.style.opacity = '0.5';
                setTimeout(() => {
                    modalImg.src = currentImagesArray[currentImageIndex];
                    modalImg.style.opacity = '1';
                }, 150);
            };

            prevBtn.addEventListener('click', (e) => { e.stopPropagation(); changeCarouselImage(-1); });
            nextBtn.addEventListener('click', (e) => { e.stopPropagation(); changeCarouselImage(1); });

            const hideModal = () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto'; 
            };

            closeModal.addEventListener('click', hideModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('carousel-container')) hideModal();
            });

            document.querySelectorAll('.antiguo-item').forEach(item => {
                item.addEventListener('click', () => {
                    let imagesAttr = item.getAttribute('data-images');
                    let imagesArray = [];
                    
                    if (imagesAttr) {
                        imagesArray = imagesAttr.split(',');
                    } else {
                        let bgImage = item.style.backgroundImage;
                        imagesArray = [bgImage.slice(4, -1).replace(/"/g, "").replace(/'/g, "")];
                    }

                    let title = item.querySelector('.antiguo-title').innerText;
                    openModal(imagesArray, title, "Serie de proyetos realizados a lo largo de la carrera, algunos son de caracter personal.");
                });
            });

            document.querySelectorAll('.gallery-item, .gallery-featured-large').forEach(item => {
                item.addEventListener('click', () => {
                    let imgSrc = item.querySelector('img').src;
                    let title = item.querySelector('.overlay-title').innerText;
                    let descNode = item.querySelector('.overlay-desc');
                    let desc = descNode ? descNode.innerText : "Serie de proyetos realizados a lo largo de la carrera, algounos son de caracter personal.";
                    openModal(imgSrc, title, desc);
                });
            });
        });
