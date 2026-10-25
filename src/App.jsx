import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./index.css";
import { privacyPolicy, termsAndConditions } from "./legalContent";

const products = [
  {
    id: 7,
    name: "SKULL GRAPHIC TEE",
    price: 450,
    category: "T-SHIRTS",
    image: "/products/skull-graphic-tee.png",
  },
  {
    id: 8,
    name: "CHAOS GRAPHIC LONG SLEEVE",
    price: 550,
    category: "HOODIES",
    image: "/products/chaos-graphic-long-sleeve.png",
  },
  {
    id: 1,
    name: "BAGGY JEANS",
    price: 200,
    category: "BOTTOMS",
    image: "/products/baggy jeans.PNG",
  },
  {
    id: 2,
    name: "RED SHIRT",
    price: 250,
    category: "T-SHIRTS",
    image: "/products/redshirt.PNG",
  },
  {
    id: 3,
    name: "CARGO PANTS",
    price: 300,
    category: "BOTTOMS",
    image: "/products/cargo pants.PNG",
  },
  {
    id: 4,
    name: "BREIFPAGE CAP",
    price: 250,
    category: "ACCESSORIES",
    image: "/products/briefpage cap.PNG",
  },
  {
    id: 5,
    name: "SIGNATURE TEE",
    price: 100,
    category: "T-SHIRTS",
    image: "/products/shirt .PNG",
  },
  {
    id: 6,
    name: "SIGNATURE SHIRT",
    price: 150,
    category: "T-SHIRTS",
    image: "/products/balck tee.PNG",
  },
];

function LegalDocument({ doc }) {
  return (
    <>
      <h1>{doc.title}</h1>

      {doc.effectiveDate && (
        <p className="legal-date">EFFECTIVE DATE: {doc.effectiveDate}</p>
      )}

      {doc.intro.map((text) => (
        <p key={text}>{text}</p>
      ))}

      {doc.sections.map((section) => (
        <section className="legal-section" key={section.heading}>
          <h2>{section.heading}</h2>

          {section.content.map((block, i) => {
            if (Array.isArray(block)) {
              return (
                <ul key={i}>
                  {block.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (typeof block === "object") {
              return <h3 key={i}>{block.sub}</h3>;
            }

            return <p key={i}>{block}</p>;
          })}
        </section>
      ))}
    </>
  );
}

const sizeChart = [
  { size: "S", length: '27"', chest: '22"', shoulder: '19"', sleeve: '23"' },
  { size: "M", length: '28"', chest: '23"', shoulder: '20"', sleeve: '24"' },
  { size: "L", length: '29"', chest: '24"', shoulder: '21"', sleeve: '25"' },
  { size: "XL", length: '30"', chest: '25"', shoulder: '22"', sleeve: '26"' },
];

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button
        type="button"
        className="accordion-header"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={`accordion-chevron${open ? " open" : ""}`}>›</span>
      </button>

      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}

function App() {
  const headerRef = useRef(null);

  useEffect(() => {
    function updateHeaderHeight() {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${headerRef.current.offsetHeight}px`
        );
      }
    }

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  const [category, setCategory] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    network: "",
    momoNumber: "",
  });

  const [orderNumber, setOrderNumber] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  // Measure the moving BRIEFPAGE banner so the menu can open right below it
  useLayoutEffect(() => {
    if (!showMenu) return;

    const updateMarqueeHeight = () => {
      const marquee = document.querySelector(".brand-marquee");
      if (marquee) {
        document.documentElement.style.setProperty(
          "--marquee-height",
          `${marquee.offsetHeight}px`
        );
      }
    };

    updateMarqueeHeight();
    window.addEventListener("resize", updateMarqueeHeight);
    return () => window.removeEventListener("resize", updateMarqueeHeight);
  }, [showMenu]);

  const resetPages = () => {
    setOrderComplete(false);
    setShowCheckout(false);
    setShowCart(false);
    setSelectedProduct(null);
    setShowMenu(false);
    setShowAbout(false);
    setShowContact(false);
    setShowPrivacy(false);
    setShowTerms(false);
    setShowSearch(false);
  };

  const goToShop = () => {
    resetPages();
    window.scrollTo(0, 0);
  };

  const goToSection = (sectionId) => {
    goToShop();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const goToAbout = () => {
    resetPages();
    setShowAbout(true);
    window.scrollTo(0, 0);
  };

  const goToContact = () => {
    resetPages();
    setShowContact(true);
    window.scrollTo(0, 0);
  };

  const goToPrivacy = () => {
    resetPages();
    setShowPrivacy(true);
    window.scrollTo(0, 0);
  };

  const goToTerms = () => {
    resetPages();
    setShowTerms(true);
    window.scrollTo(0, 0);
  };

  const goToSearch = () => {
    resetPages();
    setSearchQuery("");
    setShowSearch(true);
    window.scrollTo(0, 0);
  };

  const categories = [
    "ALL",
    "T-SHIRTS",
    "HOODIES",
    "BOTTOMS",
    "ACCESSORIES",
  ];

  const filteredProducts =
    category === "ALL"
      ? products
      : products.filter((product) => product.category === category);

  // ADD PRODUCT TO CART
  const addToCart = (product, selectedSize, selectedQuantity) => {
    const cartItem = {
      ...product,
      cartId: `${product.id}-${selectedSize}`,
      size: selectedSize,
      quantity: selectedQuantity,
    };

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.cartId === cartItem.cartId
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.cartId === cartItem.cartId
            ? {
                ...item,
                quantity: item.quantity + selectedQuantity,
              }
            : item
        );
      }

      return [...currentCart, cartItem];
    });

    setSelectedProduct(null);
    setShowCart(true);
  };

  // INCREASE QUANTITY
  const increaseQuantity = (cartId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (cartId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeFromCart = (cartId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.cartId !== cartId)
    );
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const placeOrder = () => {
    const {
      fullName,
      phone,
      email,
      address,
      city,
      network,
      momoNumber,
    } = customerInfo;

    if (
      !fullName ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !network ||
      !momoNumber
    ) {
      alert("Please complete all delivery and payment information.");
      return;
    }

    const newOrderNumber =
      "BP-" + Math.floor(100000 + Math.random() * 900000);

    setOrderNumber(newOrderNumber);

    // Save the order before clearing the cart
    setCompletedOrder([...cart]);

    // Clear the customer's cart
    setCart([]);

    // Show confirmation page
    setShowCheckout(false);
    setOrderComplete(true);
  };

  // TOTAL NUMBER OF ITEMS
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // CART TOTAL
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const completedOrderTotal = completedOrder.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const openProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSize("M");
    setShowCart(false);
    window.scrollTo(0, 0);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  // ORDER CONFIRMATION PAGE
  if (orderComplete) {
    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button
              type="button"
              className="menu-button"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label={showMenu ? "Close menu" : "Open menu"}
            >
              MENU
            </button>

            <button onClick={() => setOrderComplete(false)}>BRIEFPAGE</button>

            <div className="nav-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
            </div>

            <button onClick={() => setOrderComplete(false)}>SHOP</button>
          </nav>

          {showMenu && (
            <div className="menu-overlay" onClick={() => setShowMenu(false)}></div>
          )}

          {showMenu && (
            <div className="menu-dropdown">
              <button
                type="button"
                className="menu-close"
                onClick={() => setShowMenu(false)}
                aria-label="Close menu"
              >
                ×
              </button>

              <div className="menu-links">
                <button type="button" onClick={goToSearch}>SEARCH</button>
                <button type="button" onClick={goToShop}>SHOP</button>
                <button type="button" onClick={goToAbout}>ABOUT</button>
                <button type="button" onClick={goToContact}>CONTACT</button>
              </div>

              <div className="menu-brand-footer">BRIEFPAGE ARCHIVE LLC</div>
            </div>
          )}
        </header>

        <main className="confirmation-page">
          {/* HEADER */}

          <div className="confirmation-header">
            <div className="success-icon">✓</div>

            <p className="confirmation-label">ORDER CONFIRMED</p>

            <h1>
              THANK YOU,
              <br />
              {customerInfo.fullName.split(" ")[0].toUpperCase()}
            </h1>

            <p className="confirmation-subtitle">
              We've received your order and are preparing it for delivery.
            </p>

            <div className="order-number">ORDER #{orderNumber}</div>
          </div>

          {/* ORDER DETAILS */}

          <div className="confirmation-content">
            <section className="confirmation-section">
              <div className="section-heading">
                <h2>YOUR ORDER</h2>
                <span>
                  {completedOrder.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  ITEMS
                </span>
              </div>

              <div className="confirmation-items">
                {cart.map((item) => (
                  <div className="confirmation-item" key={item.cartId}>
                    <img src={item.image} alt={item.name} />

                    <div className="confirmation-item-info">
                      <h3>{item.name}</h3>

                      <p>
                        SIZE {item.size} · QTY {item.quantity}
                      </p>
                    </div>

                    <strong>
                      GH₵ {(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="confirmation-total">
                <span>TOTAL</span>

                <strong>GH₵ {completedOrderTotal.toLocaleString()}</strong>
              </div>
            </section>

            {/* DELIVERY + PAYMENT */}

            <div className="confirmation-info-grid">
              <section className="info-card">
                <span>DELIVERY</span>

                <h3>{customerInfo.fullName}</h3>

                <p>{customerInfo.address}</p>

                <p>{customerInfo.city}</p>

                <p>{customerInfo.phone}</p>
              </section>

              <section className="info-card">
                <span>PAYMENT</span>

                <h3>MOBILE MONEY</h3>

                <p>{customerInfo.network}</p>

                <p>{customerInfo.momoNumber}</p>
              </section>
            </div>

            {/* NEXT STEP */}

            <div className="confirmation-next">
              <div>
                <span>WHAT HAPPENS NEXT</span>

                <p>
                  Our team will contact you using the phone number
                  provided to arrange delivery and confirm your order.
                </p>
              </div>

              <div className="confirmation-status">
                <span className="status-dot"></span>
                ORDER RECEIVED
              </div>
            </div>

            <button
              className="confirmation-shop-button"
              onClick={() => setOrderComplete(false)}
            >
              CONTINUE SHOPPING →
            </button>
          </div>
        </main>
      </div>
    );
  }

  // CHECKOUT PAGE
  if (showCheckout) {
    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button
              onClick={() => {
                setShowCheckout(false);
                setShowCart(true);
              }}
            >
              ← CART
            </button>

            <div className="nav-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
            </div>

            <button>CART ({cartCount})</button>
          </nav>
        </header>

        <main className="checkout-page">
          <div className="checkout-heading">
            <h1>CHECKOUT</h1>
          </div>

          <div className="checkout-layout">
            {/* CUSTOMER INFORMATION */}

            <section className="customer-form">
              <h2>DELIVERY INFORMATION</h2>

              <label>FULL NAME</label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                placeholder="FULL NAME"
                value={customerInfo.fullName}
                onChange={handleCustomerChange}
              />

              <label>PHONE NUMBER</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="PHONE NUMBER"
                value={customerInfo.phone}
                onChange={handleCustomerChange}
              />

              <label>EMAIL</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="EMAIL"
                value={customerInfo.email}
                onChange={handleCustomerChange}
              />

              <label>DELIVERY ADDRESS</label>
              <textarea
                id="address"
                name="address"
                placeholder="DELIVERY ADDRESS"
                value={customerInfo.address}
                onChange={handleCustomerChange}
              />

              <label>CITY</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="CITY"
                value={customerInfo.city}
                onChange={handleCustomerChange}
              />

              <h2 className="payment-title">PAYMENT METHOD</h2>

              <div className="payment-options">
                <button type="button" className="payment-option active">
                  MOBILE MONEY
                </button>

                <button type="button" className="payment-option">
                  CARD
                </button>
              </div>

              <div className="mobile-money-details">
                <label>MOBILE MONEY NETWORK</label>

                <select
                  id="network"
                  name="network"
                  value={customerInfo.network}
                  onChange={handleCustomerChange}
                >
                  <option value="">SELECT NETWORK</option>
                  <option value="MTN">MTN MOBILE MONEY</option>
                  <option value="Telecel">TELECEL CASH</option>
                  <option value="AirtelTigo">AIRTELTIGO MONEY</option>
                </select>

                <label>MOBILE MONEY NUMBER</label>

                <input
                  id="momo-number"
                  name="momoNumber"
                  type="tel"
                  placeholder="e.g. 024 000 0000"
                  value={customerInfo.momoNumber}
                  onChange={handleCustomerChange}
                />
              </div>

              <button className="place-order-button" onClick={placeOrder}>
                PLACE ORDER →
              </button>
            </section>

            {/* ORDER SUMMARY */}

            <section className="order-summary">
              <h2>YOUR ORDER</h2>

              {completedOrder.map((item) => (
                <div className="summary-item" key={item.cartId}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>

                    <p>SIZE: {item.size}</p>

                    <p>QUANTITY: {item.quantity}</p>
                  </div>

                  <strong>
                    GH₵ {(item.price * item.quantity).toLocaleString()}
                  </strong>
                </div>
              ))}

              <div className="summary-total">
                <span>TOTAL</span>

                <strong>GH₵ {cartTotal.toLocaleString()}</strong>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  // ABOUT PAGE
  if (showAbout) {
    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button onClick={goToShop}>← SHOP</button>

            <div className="nav-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToPrivacy(); }}>PRIVACY POLICY</a>
            </div>

            <button onClick={() => setShowCart(true)}>
              CART ({cartCount})
            </button>
          </nav>
        </header>

        <div className="info-page-image">
          <img src="/products/about page.JPG" alt="BRIEFPAGE studio" />
        </div>

        <main className="info-page">
          <h1>ABOUT</h1>
          <p>
            This is @BRIEFPAGE ARCHIVE GALLERY LLC, founded by John Opp
            (Awesome Qwesy) and Joe Mensah.
          </p>
          <p>
            Unique vintage graphics of real and imaginary lost and found
            memories in movies, music &amp; social life pushed through self
            discovery, film photography + nostalgia. With a small + motivated
            team, we are doing our best to deliver strong design and quality
            product routinely.
          </p>
          <p>
            We have no corporate cosign or funding. We are using local
            printers, everything is hand-packed, we create all the
            documentaries.
          </p>
        </main>
      </div>
    );
  }

  // CONTACT PAGE
  if (showContact) {
    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button onClick={goToShop}>← SHOP</button>

            <div className="nav-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToPrivacy(); }}>PRIVACY POLICY</a>
            </div>

            <button onClick={() => setShowCart(true)}>
              CART ({cartCount})
            </button>
          </nav>
        </header>

        <main className="info-page">
          <h1>CONTACT</h1>
          <p>
            Questions about an order, sizing, or a drop? Reach out
            and we'll get back to you.
          </p>
          <div className="contact-links">
            <a href="mailto:hello@briefpage.com">hello@briefpage.com</a>
            <a href="tel:+233000000000">+233 00 000 0000</a>
          </div>
        </main>
      </div>
    );
  }

  // PRIVACY POLICY PAGE
  if (showPrivacy) {
    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button onClick={goToShop}>← SHOP</button>

            <div className="nav-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
            </div>

            <button onClick={() => setShowCart(true)}>
              CART ({cartCount})
            </button>
          </nav>
        </header>

        <main className="info-page">
          <LegalDocument doc={privacyPolicy} />
        </main>
      </div>
    );
  }

  // TERMS AND CONDITIONS PAGE
  if (showTerms) {
    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button onClick={goToShop}>← SHOP</button>

            <div className="nav-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
            </div>

            <button onClick={() => setShowCart(true)}>
              CART ({cartCount})
            </button>
          </nav>
        </header>

        <main className="info-page">
          <LegalDocument doc={termsAndConditions} />
        </main>
      </div>
    );
  }

  // CART PAGE
  if (showCart) {
    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button onClick={() => setShowCart(false)}>← SHOP</button>

            <div className="nav-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
            </div>

            <button>CART ({cartCount})</button>
          </nav>
        </header>

        <main className="cart-page">
          <div className="cart-heading">
            <h1>YOUR CART</h1>
            <p>{cartCount} ITEMS</p>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <h2>YOUR CART IS EMPTY</h2>

              <button onClick={() => setShowCart(false)}>
                CONTINUE SHOPPING →
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.cartId}>
                    <img src={item.image} alt={item.name} />

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>

                      <p>SIZE: {item.size}</p>

                      <p>GH₵ {item.price}</p>

                      <div className="cart-controls">
                        <button onClick={() => decreaseQuantity(item.cartId)}>
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => increaseQuantity(item.cartId)}>
                          +
                        </button>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        REMOVE
                      </button>
                    </div>

                    <strong>
                      GH₵ {(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div>
                  <span>SUBTOTAL</span>
                  <strong>GH₵ {cartTotal.toLocaleString()}</strong>
                </div>

                <p>
                  Shipping and final order details will be
                  calculated at checkout.
                </p>

                <button
                  className="checkout-button"
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                  }}
                >
                  CHECKOUT →
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    );
  }

  // PRODUCT DETAILS PAGE
  if (selectedProduct) {
    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button onClick={closeProduct}>← BACK</button>

            <div className="nav-links">
              <a href="#" onClick={closeProduct}>
                SHOP
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
            </div>

            <button onClick={() => setShowCart(true)}>
              CART ({cartCount})
            </button>
          </nav>
        </header>

        <main className="product-page">
          <div className="product-detail-image">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>

          <div className="product-details">
            <p className="product-category">{selectedProduct.category}</p>

            <h1>{selectedProduct.name}</h1>

            <p className="product-price">GH₵ {selectedProduct.price}</p>

            <p className="product-description">
              {selectedProduct.description}
            </p>

            <div className="size-section">
              <p>SELECT SIZE</p>

              <div className="sizes">
                {["S", "M", "L", "XL"].map((item) => (
                  <button
                    key={item}
                    className={size === item ? "selected-size" : ""}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-section">
              <p>QUANTITY</p>

              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>

                <span>{quantity}</span>

                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button
              className="add-cart-button"
              onClick={() => addToCart(selectedProduct, size, quantity)}
            >
              ADD TO CART — GH₵{" "}
              {(selectedProduct.price * quantity).toLocaleString()}
            </button>

            <div className="product-accordions" key={selectedProduct.id}>
              <Accordion title="SIZE CHART">
                <table className="size-table">
                  <thead>
                    <tr>
                      <th>SIZES</th>
                      <th>LENGTH</th>
                      <th>CHEST</th>
                      <th>SHOULDER</th>
                      <th>SLEEVE LENGTH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row) => (
                      <tr key={row.size}>
                        <td>{row.size}</td>
                        <td>{row.length}</td>
                        <td>{row.chest}</td>
                        <td>{row.shoulder}</td>
                        <td>{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Accordion>

              <Accordion title="CARE INFO">
                <p>Wash cold, inside out, with like colors.</p>
                <p>
                  Hang dry or tumble dry low to protect the prints and
                  graphics. Do not bleach, and do not iron directly on
                  the graphics.
                </p>
              </Accordion>

              <Accordion title="SHIPPING">
                <p>Every order is hand-packed.</p>
                <p>
                  After you place your order, our team will contact you
                  by phone to arrange delivery and confirm your delivery
                  time.
                </p>
              </Accordion>

              <Accordion title="EXCHANGES / RETURN">
                <p>
                  Items must be unused, unworn, and in original
                  condition. Refunds are processed after returned items
                  have been inspected.
                </p>
                <p>
                  For any questions or concerns, reach out to us at
                  hello@briefpagearchive.gallery
                </p>
              </Accordion>
            </div>

            <button className="continue-shopping" onClick={closeProduct}>
              ← CONTINUE SHOPPING
            </button>
          </div>
        </main>

        <section className="recommended">
          <h2 className="recommended-title">RECOMMENDED PRODUCTS</h2>

          <div className="recommended-grid">
            {products
              .filter((product) => product.id !== selectedProduct.id)
              .slice(0, 4)
              .map((product) => (
                <div
                  className="product"
                  key={product.id}
                  onClick={() => openProduct(product)}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>GH₵ {product.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    );
  }

  // SEARCH PAGE
  if (showSearch) {
    const query = searchQuery.trim().toLowerCase();
    const searchResults = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    return (
      <div className="app">
        <header className="site-header">
          <div className="brand-marquee">
            <div className="marquee-track">
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
              <span>BRIEFPAGE</span>
            </div>
          </div>

          <nav className="navbar">
            <button onClick={goToShop}>← SHOP</button>

            <div className="nav-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
            </div>

            <button onClick={() => setShowCart(true)}>
              CART ({cartCount})
            </button>
          </nav>
        </header>

        <main className="shop search-page">
          <input
            className="search-input"
            type="text"
            placeholder="SEARCH"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />

          {query && (
            <>
              <p className="search-count">
                {searchResults.length}{" "}
                {searchResults.length === 1 ? "RESULT" : "RESULTS"}
              </p>

              <div className="products">
                {searchResults.map((product) => (
                  <div
                    className="product"
                    key={product.id}
                    onClick={() => openProduct(product)}
                  >
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>GH₵ {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    );
  }

  // SHOP PAGE
  return (
    <div className="app">
      <header className="site-header" ref={headerRef}>
        <div className="brand-marquee">
          <div className="marquee-track">
            <span>BRIEFPAGE</span>
            <span>BRIEFPAGE</span>
            <span>BRIEFPAGE</span>
            <span>BRIEFPAGE</span>
          </div>
        </div>

        <nav className="navbar">
          <button
            className="menu-button"
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label={showMenu ? "Close menu" : "Open menu"}
          >
            MENU
          </button>

          <div className="nav-links">
            <a href="#" onClick={(e) => { e.preventDefault(); goToShop(); }}>HOME</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToSection("shop"); }}>SHOP</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>ABOUT</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToContact(); }}>CONTACT</a>
          </div>

          <button onClick={() => setShowCart(true)}>
            CART ({cartCount})
          </button>
        </nav>

        {showMenu && (
          <div className="menu-overlay" onClick={() => setShowMenu(false)}></div>
        )}

        {showMenu && (
          <div className="menu-dropdown">
            <button
              type="button"
              className="menu-close"
              onClick={() => setShowMenu(false)}
              aria-label="Close menu"
            >
              ×
            </button>

            <div className="menu-links">
              <button type="button" onClick={goToSearch}>SEARCH</button>
              <button type="button" onClick={goToShop}>SHOP</button>
              <button type="button" onClick={goToAbout}>ABOUT</button>
              <button type="button" onClick={goToContact}>CONTACT</button>
            </div>

            <div className="menu-brand-footer">BRIEFPAGE ARCHIVE LLC</div>
          </div>
        )}
      </header>

      <div className="categories">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <main className="shop" id="shop">
        <div className="products">
          {filteredProducts.map((product) => (
            <div
              className="product"
              key={product.id}
              onClick={() => openProduct(product)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />

                <button
                  className="quick-add"
                  onClick={(event) => {
                    event.stopPropagation();
                    addToCart(product, "M", 1);
                  }}
                >
                  +
                </button>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p>GH₵ {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="site-links-footer">
        <button type="button" onClick={goToAbout}>ABOUT</button>
        <button type="button" onClick={goToContact}>CONTACT</button>
        <button type="button" onClick={goToPrivacy}>PRIVACY POLICY</button>
        <button type="button" onClick={goToTerms}>TERMS AND CONDITIONS</button>
        <a
          href="https://www.instagram.com/briefpagearchive.gallery"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTAGRAM
        </a>
        <a
          href="https://youtube.com/@briefpagearchive.gallery"
          target="_blank"
          rel="noopener noreferrer"
        >
          YOUTUBE
        </a>
      </div>
    </div>
  );
}

export default App;