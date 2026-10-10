// ==========================================================================
// MUSA PORTFOLIO INTERACTIVE SCRIPTS & ACTIVITY MANAGER
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. MOBILE DRAWER NAVIGATION
    const menuToggle = document.getElementById('menuToggle');
    const closeDrawer = document.getElementById('closeDrawer');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openNavDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('active');
        if (drawerBackdrop) drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNavDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        if (drawerBackdrop) drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', openNavDrawer);
    if (closeDrawer) closeDrawer.addEventListener('click', closeNavDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeNavDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeNavDrawer);
    });

    // 3. AMBIENT MOUSE LIGHT BEAM EFFECT
    const ambientBeam = document.getElementById('ambientBeam');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const xPercent = (mouseX / window.innerWidth) * 100;
        const yPercent = (mouseY / window.innerHeight) * 100;

        if (ambientBeam) {
            ambientBeam.style.background = `
                radial-gradient(ellipse 70% 50% at ${xPercent}% ${yPercent}%, rgba(255, 85, 0, 0.35) 0%, rgba(255, 120, 0, 0.12) 40%, rgba(10, 7, 5, 0) 75%),
                radial-gradient(ellipse 60% 45% at 85% 65%, rgba(255, 120, 0, 0.2) 0%, rgba(10, 7, 5, 0) 70%)
            `;
        }
    });

    // 4. DATABASE OF PROJECTS (DEFAULT + LOCALSTORAGE CUSTOM DATA)
    const initialProjectsDatabase = {
        'ml-event': {
            id: 'ml-event',
            title: 'Liga Nasional Mobile Legends',
            categoryBadge: 'EVENT DOCUMENTATION',
            categories: ['event', 'streaming'],
            photos: [
                { src: 'assets/work_ml_event.png', label: '1. Panggung Utama & Broadcast Arena' },
                { src: 'assets/work_video_prod.png', label: '2. Ruang Kontrol Multi-Cam' },
                { src: 'assets/work_event_mass.png', label: '3. Behind The Scene Euforia Penonton' }
            ],
            desc: 'Dokumentasi komprehensif turnamen e-sports skala nasional. Mengelola live streaming multi-camera broadcast, liputan panggung utama, atmosfer ruang pemain, hingga momen behind the scenes yang penuh antusiasme.',
            tags: ['VIDEO', 'PHOTO', 'BEHIND THE SCENE']
        },
        'sports-photo': {
            id: 'sports-photo',
            title: 'Sports & Motorsport Photography',
            categoryBadge: 'SPORTS PHOTOGRAPHY',
            categories: ['event', 'personal'],
            photos: [
                { src: 'assets/work_sports_photo.png', label: '1. Action High-Speed Track' },
                { src: 'assets/work_daily_content.png', label: '2. Persiapan Tim & Kru Pitstop' },
                { src: 'assets/work_edu_content.png', label: '3. Selebrasi Podium Pemenang' }
            ],
            desc: 'Dokumentasi fotografi kecepatan tinggi untuk ajang motorsport nasional. Menangkap momen emas aksi para pembalap di lintasan balap, atmosfer pitstop kru, serta selebrasi podium pemenang.',
            tags: ['VIDEO', 'PHOTO', 'BEHIND THE SCENE']
        },
        'mass-event': {
            id: 'mass-event',
            title: 'Event Vaksinasi Massal Pelajar',
            categoryBadge: 'PUBLIC EVENT DOCUMENTATION',
            categories: ['event', 'streaming'],
            photos: [
                { src: 'assets/work_event_mass.png', label: '1. Suasana Arena Hall & Alur Kegiatan' },
                { src: 'assets/work_ml_event.png', label: '2. Liputan Stage Multi-Camera' },
                { src: 'assets/work_daily_content.png', label: '3. Sesi Wawancara Peserta' }
            ],
            desc: 'Pengelolaan dokumentasi visual dan live streaming acara vaksinasi serentak tingkat pelajar. Mencakup liputan protokol kesehatan, sesi sambutan pejabat, wawancara peserta, dan video highlight rangkuman acara.',
            tags: ['VIDEO', 'PHOTO', 'BEHIND THE SCENE']
        },
        'daily-content': {
            id: 'daily-content',
            title: 'Daily Content Brand Campaign',
            categoryBadge: 'SOCIAL MEDIA CONTENT',
            categories: ['social'],
            photos: [
                { src: 'assets/Kultur Kelana 1.png', label: '1. Creative Setup & Aesthetic Props' },
                { src: 'assets/Kultur Kelana 2.png', label: '2. Editing & Color Grading Reels' },
                { src: 'assets/Kultur Kelana 3.png', label: '3. Studio Short Video Production' }
            ],
            desc: 'Perancangan dan produksi konten kreatif harian untuk campaign media sosial brand terkemuka. Fokus pada micro-video (Reels/TikTok), foto produk aesthetic, dan copywriting yang mendorong peningkatkan engagement.',
            tags: ['VIDEO', 'PHOTO', 'BEHIND THE SCENE']
        },
        'edu-content': {
            id: 'edu-content',
            title: 'Educational & Personal Branding',
            categoryBadge: 'PERSONAL BRANDING',
            categories: ['personal', 'social'],
            photos: [
                { src: 'assets/Judo 1.png', label: '1. Studio Lighting & Visual Framing' },
                { src: 'assets/Judo 2.png', label: '2. On-Location Creative Shoot' },
                { src: 'assets/Judo 3.png', label: '3. Sesi Workshop & Storytelling' }
            ],
            desc: 'Strategi visual & produksi konten edukatif untuk membangun reputasi personal brand di media sosial. Menggabungkan konsep storytelling ringkas, animasi grafis pendukung, serta sinematografi studio yang rapi.',
            tags: ['VIDEO', 'PHOTO', 'BEHIND THE SCENE']
        },
        'video-prod': {
            id: 'video-prod',
            title: 'Commercial Video Production',
            categoryBadge: 'CREATIVE VIDEO PRODUCTION',
            categories: ['social', 'event'],
            photos: [
                { src: 'assets/work_video_prod.png', label: '1. Professional Cinema Camera Rig' },
                { src: 'assets/work_event_mass.png', label: '2. Directing & Crew di Lokasi Set' },
                { src: 'assets/work_sports_photo.png', label: '3. Color Grading Sinematik' }
            ],
            desc: 'Produksi video komersial dan company profile berstandar sinematik tinggi. Bertanggung jawab penuh mulai dari ideasi script, creative direction di lokasi syuting, lighting setup, hingga tahapan pasca-produksi.',
            tags: ['VIDEO', 'PHOTO', 'BEHIND THE SCENE']
        }
    };

    // Helper functions for LocalStorage
    function getStoredCustomProjects() {
        try {
            return JSON.parse(localStorage.getItem('musa_custom_projects')) || {};
        } catch (e) {
            return {};
        }
    }

    function saveCustomProjectsToStorage(customData) {
        localStorage.setItem('musa_custom_projects', JSON.stringify(customData));
    }

    // Combined Projects Database
    let projectsDatabase = { ...initialProjectsDatabase, ...getStoredCustomProjects() };

    let currentFilter = 'all';
    let activeFilteredProjectIds = [];
    let currentProjectIndex = 0;

    // Render All Cards in Portfolio Grid Dynamically
    const worksGrid = document.getElementById('worksGrid');

    function renderWorksGrid() {
        if (!worksGrid) return;
        worksGrid.innerHTML = '';

        const customData = getStoredCustomProjects();

        Object.values(projectsDatabase).forEach(project => {
            const isCustom = Boolean(customData[project.id]);
            const categoriesStr = (project.categories || []).join(' ');
            const mainPhotoSrc = project.photos && project.photos.length > 0 ? project.photos[0].src : 'assets/work_ml_event.png';
            const tagsHTML = (project.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join('');

            const cardElem = document.createElement('div');
            cardElem.className = 'work-card';
            cardElem.setAttribute('data-category', categoriesStr);
            cardElem.setAttribute('data-id', project.id);

            // Apply filter visibility
            if (currentFilter !== 'all' && !categoriesStr.includes(currentFilter)) {
                cardElem.style.display = 'none';
            }

            cardElem.innerHTML = `
                <div class="work-image-holder">
                    <img src="${mainPhotoSrc}" alt="${project.title}">
                    <span class="work-category-badge">${project.categoryBadge || 'EVENT'}</span>
                    ${isCustom ? `<span class="custom-card-tag">NEW</span>` : ''}
                    <button class="work-play-btn" aria-label="Lihat Detail Proyek">
                        <i data-lucide="play"></i>
                    </button>
                    <div class="work-img-overlay"></div>
                    ${isCustom ? `
                        <button class="delete-custom-btn" data-id="${project.id}" title="Hapus Kegiatan Ini">
                            <i data-lucide="trash-2"></i>
                        </button>
                    ` : ''}
                </div>
                <div class="work-info">
                    <h3 class="work-title">${project.title}</h3>
                    <p class="work-desc">${project.desc}</p>
                    <div class="work-tags">
                        ${tagsHTML}
                    </div>
                </div>
            `;

            worksGrid.appendChild(cardElem);
        });

        // Re-attach Lucide Icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Attach Click Events to Cards
        attachCardClickEvents();
    }

    // Attach Click Events to Dynamically Created Cards
    function attachCardClickEvents() {
        const workCards = document.querySelectorAll('.work-card');

        workCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Ignore if clicked on delete button
                if (e.target.closest('.delete-custom-btn')) {
                    e.stopPropagation();
                    const projectId = e.target.closest('.delete-custom-btn').getAttribute('data-id');
                    deleteCustomProject(projectId);
                    return;
                }

                const projectId = card.getAttribute('data-id');
                activeFilteredProjectIds = getFilteredProjectIds();

                let clickedIndex = activeFilteredProjectIds.indexOf(projectId);
                if (clickedIndex === -1) clickedIndex = 0;

                loadModalProject(clickedIndex);

                if (workModal) {
                    workModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    // Delete custom project from LocalStorage
    function deleteCustomProject(id) {
        if (!confirm('Apakah Anda yakin ingin menghapus data kegiatan ini?')) return;

        const customData = getStoredCustomProjects();
        delete customData[id];
        saveCustomProjectsToStorage(customData);

        delete projectsDatabase[id];
        renderWorksGrid();
    }

    // 5. PORTFOLIO FILTER TABS & STATE MANAGEMENT
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.getAttribute('data-filter');
            const allWorkCards = document.querySelectorAll('.work-card');

            allWorkCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';

                if (currentFilter === 'all' || categories.includes(currentFilter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initial Grid Render
    renderWorksGrid();

    // 6. CONTACT FORM MODAL LOGIC
    const contactModal = document.getElementById('contactModal');
    const openContactBtns = document.querySelectorAll('.open-contact-modal');
    const closeContactModal = document.getElementById('closeContactModal');

    function showContactModal(e) {
        if (e) e.preventDefault();
        if (workModal) workModal.classList.remove('active');
        if (contactModal) contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideContactModal() {
        if (contactModal) contactModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openContactBtns.forEach(btn => {
        btn.addEventListener('click', showContactModal);
    });

    if (closeContactModal) closeContactModal.addEventListener('click', hideContactModal);
    if (contactModal) {
        const backdrop = contactModal.querySelector('.modal-backdrop');
        if (backdrop) backdrop.addEventListener('click', hideContactModal);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Musadad Suudi akan segera menghubungi Anda.');
            hideContactModal();
            contactForm.reset();
        });
    }

    // 7. PORTFOLIO LIGHTBOX MODAL WITH SIMULTANEOUS 3-PHOTO DISPLAY & FILTERED NAVIGATION
    const workModal = document.getElementById('workModal');
    const closeWorkModal = document.getElementById('closeWorkModal');
    const prevWorkBtn = document.getElementById('prevWorkBtn');
    const nextWorkBtn = document.getElementById('nextWorkBtn');

    // Media Elements for 3 Photos Shown Simultaneously
    const modalPhoto1 = document.getElementById('modalPhoto1');
    const modalPhoto2 = document.getElementById('modalPhoto2');
    const modalPhoto3 = document.getElementById('modalPhoto3');
    const badgePhoto1 = document.getElementById('badgePhoto1');
    const badgePhoto2 = document.getElementById('badgePhoto2');
    const badgePhoto3 = document.getElementById('badgePhoto3');

    // Text & Info Elements
    const workModalCategory = document.getElementById('workModalCategory');
    const workModalTitle = document.getElementById('workModalTitle');
    const workModalDesc = document.getElementById('workModalDesc');
    const workModalTags = document.getElementById('workModalTags');
    const modalFilterIndicator = document.getElementById('modalFilterIndicator');
    const modalCounterText = document.getElementById('modalCounterText');

    function getFilteredProjectIds() {
        const matchingIds = [];
        const allCardElems = Array.from(document.querySelectorAll('.work-card'));

        allCardElems.forEach(card => {
            const id = card.getAttribute('data-id');
            const categories = card.getAttribute('data-category') || '';

            if (currentFilter === 'all' || categories.includes(currentFilter)) {
                if (projectsDatabase[id] && !matchingIds.includes(id)) {
                    matchingIds.push(id);
                }
            }
        });

        return matchingIds.length > 0 ? matchingIds : Object.keys(projectsDatabase);
    }

    function loadModalProject(index) {
        activeFilteredProjectIds = getFilteredProjectIds();

        if (index < 0) {
            index = activeFilteredProjectIds.length - 1;
        } else if (index >= activeFilteredProjectIds.length) {
            index = 0;
        }

        currentProjectIndex = index;
        const projectId = activeFilteredProjectIds[currentProjectIndex];
        const data = projectsDatabase[projectId];

        if (!data) return;

        if (workModalTitle) workModalTitle.innerText = data.title;
        if (workModalCategory) workModalCategory.innerText = data.categoryBadge;
        if (workModalDesc) workModalDesc.innerText = data.desc;

        if (workModalTags) {
            workModalTags.innerHTML = (data.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join('');
        }

        if (modalFilterIndicator) {
            const filterLabelMap = {
                'all': 'Semua (All)',
                'event': 'Event',
                'streaming': 'Streaming',
                'social': 'Social Media',
                'personal': 'Personal Brand',
                'bts': 'Behind The Scene'
            };
            modalFilterIndicator.innerText = `Kategori: ${filterLabelMap[currentFilter] || currentFilter}`;
        }

        if (modalCounterText) {
            modalCounterText.innerText = `Proyek ${currentProjectIndex + 1} dari ${activeFilteredProjectIds.length}`;
        }

        if (data.photos && data.photos.length >= 3) {
            if (modalPhoto1) {
                modalPhoto1.style.opacity = '0.3';
                setTimeout(() => {
                    modalPhoto1.src = data.photos[0].src;
                    modalPhoto1.style.opacity = '1';
                }, 100);
            }
            if (badgePhoto1) badgePhoto1.innerText = data.photos[0].label;

            if (modalPhoto2) {
                modalPhoto2.style.opacity = '0.3';
                setTimeout(() => {
                    modalPhoto2.src = data.photos[1].src;
                    modalPhoto2.style.opacity = '1';
                }, 150);
            }
            if (badgePhoto2) badgePhoto2.innerText = data.photos[1].label;

            if (modalPhoto3) {
                modalPhoto3.style.opacity = '0.3';
                setTimeout(() => {
                    modalPhoto3.src = data.photos[2].src;
                    modalPhoto3.style.opacity = '1';
                }, 200);
            }
            if (badgePhoto3) badgePhoto3.innerText = data.photos[2].label;
        }
    }

    if (prevWorkBtn) {
        prevWorkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            loadModalProject(currentProjectIndex - 1);
        });
    }

    if (nextWorkBtn) {
        nextWorkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            loadModalProject(currentProjectIndex + 1);
        });
    }

    function closeWorkModalFunc() {
        if (workModal) workModal.classList.remove('active');
        if (!lightboxModal || !lightboxModal.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }

    if (closeWorkModal) {
        closeWorkModal.addEventListener('click', closeWorkModalFunc);
    }

    if (workModal) {
        const backdrop = workModal.querySelector('.modal-backdrop');
        if (backdrop) backdrop.addEventListener('click', closeWorkModalFunc);
    }

    // 8. FULLSCREEN LIGHTBOX MODAL LOGIC
    const lightboxModal = document.getElementById('lightboxModal');
    const closeLightbox = document.getElementById('closeLightbox');
    const closeLightboxBackdrop = document.getElementById('closeLightboxBackdrop');
    const prevLightboxBtn = document.getElementById('prevLightboxBtn');
    const nextLightboxBtn = document.getElementById('nextLightboxBtn');

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxProjectTitle = document.getElementById('lightboxProjectTitle');
    const lightboxPhotoLabel = document.getElementById('lightboxPhotoLabel');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let currentPhotoIndexInProject = 0;

    function openLightbox(photoIndex) {
        if (!activeFilteredProjectIds || activeFilteredProjectIds.length === 0) {
            activeFilteredProjectIds = getFilteredProjectIds();
        }

        const currentProjectId = activeFilteredProjectIds[currentProjectIndex] || Object.keys(projectsDatabase)[0];
        const project = projectsDatabase[currentProjectId];

        if (!project || !project.photos || project.photos.length === 0) return;

        currentPhotoIndexInProject = (photoIndex + project.photos.length) % project.photos.length;
        const photo = project.photos[currentPhotoIndexInProject];

        if (lightboxImg) lightboxImg.src = photo.src;
        if (lightboxProjectTitle) lightboxProjectTitle.innerText = project.title;
        if (lightboxPhotoLabel) lightboxPhotoLabel.innerText = photo.label;
        if (lightboxCounter) lightboxCounter.innerText = `Foto ${currentPhotoIndexInProject + 1} dari ${project.photos.length}`;

        if (lightboxModal) {
            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function closeLightboxFunc() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
        }

        if (workModal && workModal.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function navigateLightbox(direction) {
        if (!lightboxImg) return;

        const currentProjectId = activeFilteredProjectIds[currentProjectIndex];
        const project = projectsDatabase[currentProjectId];
        if (!project || !project.photos) return;

        lightboxImg.style.opacity = '0.3';
        lightboxImg.style.transform = 'scale(0.96)';

        setTimeout(() => {
            openLightbox(currentPhotoIndexInProject + direction);
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 120);
    }

    const clickablePhotos = document.querySelectorAll('.clickable-photo');
    clickablePhotos.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const pIndex = parseInt(item.getAttribute('data-photo-index'), 10) || 0;
            openLightbox(pIndex);
        });
    });

    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxFunc);
    if (closeLightboxBackdrop) closeLightboxBackdrop.addEventListener('click', closeLightboxFunc);

    if (prevLightboxBtn) {
        prevLightboxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });
    }

    if (nextLightboxBtn) {
        nextLightboxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });
    }

    // 9. ADMIN FORM & ACTIVITY CREATOR LOGIC
    const addActivityModal = document.getElementById('addActivityModal');
    const openAddActivityModalBtn = document.getElementById('openAddActivityModal');
    const closeAddActivityModalBtn = document.getElementById('closeAddActivityModal');
    const closeAddActivityBackdrop = document.getElementById('closeAddActivityBackdrop');
    const addActivityForm = document.getElementById('addActivityForm');

    function openAddModal() {
        if (addActivityModal) addActivityModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeAddModal() {
        if (addActivityModal) addActivityModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (openAddActivityModalBtn) openAddActivityModalBtn.addEventListener('click', openAddModal);
    if (closeAddActivityModalBtn) closeAddActivityModalBtn.addEventListener('click', closeAddModal);
    if (closeAddActivityBackdrop) closeAddActivityBackdrop.addEventListener('click', closeAddModal);

    // Image File Upload Preview & Data State
    const formPhotoState = [
        { src: '', label: '' },
        { src: '', label: '' },
        { src: '', label: '' }
    ];

    function handlePhotoInput(index, file, url) {
        const prevImg = document.getElementById(`prevImg${index}`);
        const prevPlace = document.getElementById(`prevPlace${index}`);

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const dataUrl = e.target.result;
                formPhotoState[index - 1].src = dataUrl;
                if (prevImg) {
                    prevImg.src = dataUrl;
                    prevImg.classList.remove('hidden');
                }
                if (prevPlace) prevPlace.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else if (url) {
            formPhotoState[index - 1].src = url;
            if (prevImg) {
                prevImg.src = url;
                prevImg.classList.remove('hidden');
            }
            if (prevPlace) prevPlace.style.display = 'none';
        }
    }

    [1, 2, 3].forEach(idx => {
        const fileInput = document.getElementById(`actFile${idx}`);
        const urlInput = document.getElementById(`actUrl${idx}`);

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    handlePhotoInput(idx, e.target.files[0], null);
                }
            });
        }

        if (urlInput) {
            urlInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if (val) {
                    handlePhotoInput(idx, null, val);
                }
            });
        }
    });

    // Submit Add Activity Form
    if (addActivityForm) {
        addActivityForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('actTitle').value.trim();
            const categoryBadge = document.getElementById('actBadge').value.trim();
            const desc = document.getElementById('actDesc').value.trim();
            const rawTags = document.getElementById('actTags').value.trim();
            const tags = rawTags ? rawTags.split(',').map(t => t.trim().toUpperCase()) : ['VIDEO', 'PHOTO'];

            // Get selected categories
            const selectedCategories = [];
            const checkboxes = document.querySelectorAll('input[name="actCategories"]:checked');
            checkboxes.forEach(cb => selectedCategories.push(cb.value));

            if (selectedCategories.length === 0) {
                selectedCategories.push('event');
            }

            // Get 3 Photos
            const photo1Label = document.getElementById('actLabel1').value.trim() || '1. Foto Utama';
            const photo2Label = document.getElementById('actLabel2').value.trim() || '2. Behind The Scene';
            const photo3Label = document.getElementById('actLabel3').value.trim() || '3. Detail Liputan';

            const defaultPlaceholders = [
                'assets/work_ml_event.png',
                'assets/work_video_prod.png',
                'assets/work_event_mass.png'
            ];

            const photos = [
                { src: formPhotoState[0].src || (document.getElementById('actUrl1') ? document.getElementById('actUrl1').value.trim() : '') || defaultPlaceholders[0], label: photo1Label },
                { src: formPhotoState[1].src || (document.getElementById('actUrl2') ? document.getElementById('actUrl2').value.trim() : '') || defaultPlaceholders[1], label: photo2Label },
                { src: formPhotoState[2].src || (document.getElementById('actUrl3') ? document.getElementById('actUrl3').value.trim() : '') || defaultPlaceholders[2], label: photo3Label }
            ];

            // Generate unique project ID
            const newId = 'custom-' + Date.now();

            const newProjectData = {
                id: newId,
                title,
                categoryBadge,
                categories: selectedCategories,
                photos,
                desc,
                tags
            };

            // Save to LocalStorage custom database
            const customData = getStoredCustomProjects();
            customData[newId] = newProjectData;
            saveCustomProjectsToStorage(customData);

            // Update local memory database
            projectsDatabase[newId] = newProjectData;

            // Re-render works grid
            renderWorksGrid();

            // Close modal & reset form
            closeAddModal();
            addActivityForm.reset();

            // Reset image previews
            [1, 2, 3].forEach(i => {
                formPhotoState[i - 1] = { src: '', label: '' };
                const pImg = document.getElementById(`prevImg${i}`);
                const pPlace = document.getElementById(`prevPlace${i}`);
                if (pImg) pImg.classList.add('hidden');
                if (pPlace) pPlace.style.display = 'flex';
            });

            alert('Kegiatan baru berhasil ditambahkan dan langsung tampil di portofolio Anda!');
        });
    }

    // 10. EXPORT CODE MODAL LOGIC
    const exportModal = document.getElementById('exportModal');
    const openExportCodeBtn = document.getElementById('openExportCodeBtn');
    const closeExportModalBtn = document.getElementById('closeExportModal');
    const closeExportBackdrop = document.getElementById('closeExportBackdrop');
    const codeExportArea = document.getElementById('codeExportArea');
    const copyCodeBtn = document.getElementById('copyCodeBtn');

    function openExportModalFunc() {
        if (codeExportArea) {
            codeExportArea.value = 'const projectsDatabase = ' + JSON.stringify(projectsDatabase, null, 4) + ';';
        }
        if (exportModal) exportModal.classList.add('active');
    }

    function closeExportModalFunc() {
        if (exportModal) exportModal.classList.remove('active');
    }

    if (openExportCodeBtn) openExportCodeBtn.addEventListener('click', openExportModalFunc);
    if (closeExportModalBtn) closeExportModalBtn.addEventListener('click', closeExportModalFunc);
    if (closeExportBackdrop) closeExportBackdrop.addEventListener('click', closeExportModalFunc);

    if (copyCodeBtn && codeExportArea) {
        copyCodeBtn.addEventListener('click', () => {
            codeExportArea.select();
            navigator.clipboard.writeText(codeExportArea.value).then(() => {
                alert('Kode JavaScript berhasil disalin ke clipboard! Anda bisa menempelkannya ke file script.js jika ingin menyimpan secara permanen.');
            }).catch(() => {
                document.execCommand('copy');
                alert('Kode JavaScript berhasil disalin!');
            });
        });
    }

    // Keyboard Navigation for Modals
    document.addEventListener('keydown', (e) => {
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            } else if (e.key === 'Escape') {
                closeLightboxFunc();
            }
            return;
        }

        if (workModal && workModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                loadModalProject(currentProjectIndex - 1);
            } else if (e.key === 'ArrowRight') {
                loadModalProject(currentProjectIndex + 1);
            } else if (e.key === 'Escape') {
                closeWorkModalFunc();
            }
            return;
        }

        if (addActivityModal && addActivityModal.classList.contains('active')) {
            if (e.key === 'Escape') closeAddModal();
        }

        if (exportModal && exportModal.classList.contains('active')) {
            if (e.key === 'Escape') closeExportModalFunc();
        }
    });

    // 11. TOUCH SWIPE GESTURES FOR MOBILE & TABLET DEVICES
    let touchStartX = 0;
    let touchStartY = 0;

    function enableSwipeGestures(modalElement, onSwipeNext, onSwipePrev) {
        if (!modalElement) return;

        modalElement.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        modalElement.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 1) {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const diffX = touchEndX - touchStartX;
                const diffY = touchEndY - touchStartY;

                // Trigger swipe if horizontal movement is > 45px and greater than vertical movement
                if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX < 0) {
                        onSwipeNext();
                    } else {
                        onSwipePrev();
                    }
                }
            }
        }, { passive: true });
    }

    // Enable touch swipes for Work Modal & Lightbox
    enableSwipeGestures(workModal, () => loadModalProject(currentProjectIndex + 1), () => loadModalProject(currentProjectIndex - 1));
    enableSwipeGestures(lightboxModal, () => navigateLightbox(1), () => navigateLightbox(-1));

});
