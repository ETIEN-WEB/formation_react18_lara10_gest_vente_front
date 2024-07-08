import React from 'react';
import { Link } from 'react-router-dom';
import {useStateContext} from "../../contexts/ContextProvider";
import GlobalFunction from "../../GlobalFunction";

const SideBar = () => {
    const { currentUser } = useStateContext();

    return (
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark bg-theme-basic" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Core</div>
                        <Link class="nav-link" to="/">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </Link>
                        <div className="sb-sidenav-menu-heading">Produit</div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                           data-bs-target="#product" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Produit
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="product" aria-labelledby="headingOne"
                             data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="/product">Liste produits</Link>
                                {
                                    GlobalFunction.isAdmin() &&
                                        <>
                                            <Link class="nav-link" to="product/create">Ajouter produit</Link>
                                            <Link class="nav-link" to="product/trash">Supprimé</Link>
                                        </>
                                }

                            </nav>
                        </div>
                        {GlobalFunction.isAdmin() && (
                            <>
                                <div className="sb-sidenav-menu-heading">Boutique</div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                   data-bs-target="#shops" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Boutique
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="shops" aria-labelledby="headingOne"
                                     data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link class="nav-link" to="/shop">Liste boutique</Link>
                                        <Link class="nav-link" to="shop/create">Ajouter boutique</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                   data-bs-target="#sales_manager" aria-expanded="false"
                                   aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Gestion des ventes
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div className="collapse" id="sales_manager" aria-labelledby="headingOne"
                                     data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link class="nav-link" to="/sales-manager">Liste des ventes</Link>
                                        <Link class="nav-link" to="sales-manager/create">Ajouter une vente </Link>
                                    </nav>
                                </div>
                                <div className="sb-sidenav-menu-heading">Gestion</div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                   data-bs-target="#collapseLayouts" aria-expanded="false"
                                   aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Catégories
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                                     data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link class="nav-link" to="/category">Liste catégories</Link>
                                        <Link class="nav-link" to="category/create">Ajouter catégorie</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                   data-bs-target="#sub_category" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Sous-catégories
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div className="collapse" id="sub_category" aria-labelledby="headingOne"
                                     data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link class="nav-link" to="/sub-category">Liste sous-catégories</Link>
                                        <Link class="nav-link" to="sub-category/create">Ajouter sous-catégorie</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                   data-bs-target="#brand" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Marque
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div className="collapse" id="brand" aria-labelledby="headingOne"
                                     data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link class="nav-link" to="/brand">Liste des marques</Link>
                                        <Link class="nav-link" to="brand/create">Ajouter une marque</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                                   data-bs-target="#supplier" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Fournisseur
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div className="collapse" id="supplier" aria-labelledby="headingOne"
                                     data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link class="nav-link" to="/supplier">Liste des fournisseurs</Link>
                                        <Link class="nav-link" to="supplier/create">Ajouter un fournisseur</Link>
                                    </nav>
                                </div>
                                <Link class="nav-link" to="product-attributes">
                                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                    Attribut Produit
                                </Link>
                            </>
                        )}

                        <div className="sb-sidenav-menu-heading">Commandes</div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse"
                           data-bs-target="#orders" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Commandes
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="orders" aria-labelledby="headingOne"
                             data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link class="nav-link" to="/order">Liste des Commandes</Link>
                                <Link class="nav-link" to="order/create">Créer une Commande</Link>
                            </nav>
                        </div>

                        <div className="sb-sidenav-menu-heading">Accéssoires</div>
                        <Link class="nav-link" to="generate-bar-code">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            générer code barre
                        </Link>
                        <div className="sb-sidenav-menu-heading"> Rapports </div>
                        <Link class="nav-link" to="report">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Rapports
                        </Link>
                    </div>
                </div>
                <div class="sb-sidenav-footer text-theme-light">
                    <div class="small">Connecté en tant:</div>
                    { localStorage.NAME || null }
                </div>
            </nav>
        </div>
    );
};

export default SideBar;