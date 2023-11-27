(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      if (!header.classList.contains('header-scrolled')) {
        offset -= 10
      }
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Gallery isotope and filter
     */
    window.addEventListener('load', () => {
      let galleryContainer = select('.gallery-container');
      if (galleryContainer) {
        let galleryIsotope = new Isotope(galleryContainer, {
          itemSelector: '.gallery-item',
          layoutMode: 'fitRows'
        });
  
        let galleryFilters = select('#gallery-flters li', true);
  
        on('click', '#gallery-flters li', function(e) {
          e.preventDefault();
          galleryFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          galleryIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
  
        }, true);
      }
  
    });
  
    /**
     * Initiate gallery lightbox 
     */
    const galleryLightbox = GLightbox({
      selector: '.gallery-lightbox'
    });
  
    /**
     * gallery details slider
     */
    new Swiper('.gallery-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });

    /**
   * Tour isotope and filter
   */
  window.addEventListener('load', () => {
    let tourContainer = select('.tour-container');
    if (tourContainer) {
      let tourIsotope = new Isotope(tourContainer, {
        itemSelector: '.tour-item',
        layoutMode: 'fitRows'
      });

      let tourFilters = select('#tour-flters li', true);

      on('click', '#tour-flters li', function(e) {
        e.preventDefault();
        tourFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        tourIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate tour lightbox 
   */
  const tourLightbox = GLightbox({
    selector: '.tour-lightbox'
  });

  /**
   * tour details slider
   */
  new Swiper('.tour-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

    /**
   * Culture isotope and filter
   */
    window.addEventListener('load', () => {
      let cultureContainer = select('.culture-container');
      if (cultureContainer) {
        let cultureIsotope = new Isotope(cultureContainer, {
          itemSelector: '.culture-item',
          layoutMode: 'fitRows'
        });
  
        let cultureFilters = select('#culture-flters li', true);
  
        on('click', '#culture-flters li', function(e) {
          e.preventDefault();
          cultureFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          cultureIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
  
        }, true);
      }
  
    });
  
    /**
     * Initiate culture lightbox 
     */
    const cultureLightbox = GLightbox({
      selector: '.culture-lightbox'
    });
  
    /**
     * culture details slider
     */
    new Swiper('.culture-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });

      /**
   * Festivals isotope and filter
   */
  window.addEventListener('load', () => {
    let festivalsContainer = select('.festivals-container');
    if (festivalsContainer) {
      let festivalsIsotope = new Isotope(festivalsContainer, {
        itemSelector: '.festivals-item',
        layoutMode: 'fitRows'
      });

      let festivalsFilters = select('#festivals-flters li', true);

      on('click', '#festivals-flters li', function(e) {
        e.preventDefault();
        festivalsFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        festivalsIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate festivals lightbox 
   */
  const festivalsLightbox = GLightbox({
    selector: '.festivals-lightbox'
  });

  /**
   * festivals details slider
   */
  new Swiper('.festivals-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
  
    /**
   * Landscape isotope and filter
   */
    window.addEventListener('load', () => {
      let landscapeContainer = select('.landscape-container');
      if (landscapeContainer) {
        let landscapeIsotope = new Isotope(landscapeContainer, {
          itemSelector: '.landscape-item',
          layoutMode: 'fitRows'
        });
  
        let landscapeFilters = select('#landscape-flters li', true);
  
        on('click', '#landscape-flters li', function(e) {
          e.preventDefault();
          landscapeFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          landscapeIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
  
        }, true);
      }
  
    });
  
    /**
     * Initiate landscape lightbox 
     */
    const landscapeLightbox = GLightbox({
      selector: '.landscape-lightbox'
    });
  
    /**
     * landscape details slider
     */
    new Swiper('.landscape-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });

      /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let cuisineContainer = select('.cuisine-container');
    if (cuisineContainer) {
      let cuisineIsotope = new Isotope(cuisineContainer, {
        itemSelector: '.cuisine-item',
        layoutMode: 'fitRows'
      });

      let cuisineFilters = select('#cuisine-flters li', true);

      on('click', '#cuisine-flters li', function(e) {
        e.preventDefault();
        cuisineFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        cuisineIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate cuisine lightbox 
   */
  const cuisineLightbox = GLightbox({
    selector: '.cuisine-lightbox'
  });

  /**
   * cuisine details slider
   */
  new Swiper('.cuisine-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  })()