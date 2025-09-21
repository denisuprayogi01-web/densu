document.addEventListener('DOMContentLoaded', () => {

    const products = [
        {
            id: 1,
            name: "Jaket Bomber Pria (Model Inggris)",
            price: 450000,
            image: "https://i.imgur.com/83pL3lV.jpg"
        },
        {
            id: 2,
            name: "Kemeja Lengan Panjang Wanita",
            price: 280000,
            image: "https://i.imgur.com/kS5x8eD.jpg"
        },
        {
            id: 3,
            name: "Celana Jeans Slim-Fit",
            price: 350000,
            image: "https://i.imgur.com/bW3g1sU.jpg"
        },
        {
            id: 4,
            name: "Kaos Henley Pria",
            price: 150000,
            image: "https://i.imgur.com/U038E5i.jpg"
        },
        {
            id: 5,
            name: "Rok Midi Plisket Wanita",
            price: 220000,
            image: "https://i.imgur.com/eB3sY3v.jpg"
        },
        {
            id: 6,
            name: "Hoodie Klasik Unisex",
            price: 320000,
            image: "https://i.imgur.com/4q3Vn0f.jpg"
        }
    ];

    const productContainer = document.getElementById('product-container');
    const cartCountSpan = document.getElementById('cart-count');
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeModalButton = document.querySelector('.close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    let cart = [];

    // Fungsi untuk menampilkan produk di halaman
    function displayProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rp${product.price.toLocaleString('id-ID')}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Tambah ke Keranjang</button>
            `;
            productContainer.appendChild(productCard);
        });
    }

    // Fungsi untuk menambahkan produk ke keranjang
    function addToCart(productId) {
        const product = products.find(p => p.id == productId);
        if (product) {
            const existingItem = cart.find(item => item.id == productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        }
    }

    // Fungsi untuk memperbarui tampilan keranjang dan jumlah total
    function updateCart() {
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Jumlah: ${item.quantity}</p>
                        <p>Harga: Rp${(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
                total += item.price * item.quantity;
            });
        }
        totalPriceSpan.textContent = total.toLocaleString('id-ID');
    }

    // Event listener untuk tombol "Tambah ke Keranjang"
    productContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.dataset.id;
            addToCart(productId);
            alert('Produk berhasil ditambahkan ke keranjang!');
        }
    });

    // Event listener untuk membuka dan menutup modal keranjang
    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Inisialisasi tampilan produk saat halaman dimuat
    displayProducts();
});