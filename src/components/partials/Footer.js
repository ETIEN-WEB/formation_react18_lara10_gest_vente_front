import React from 'react';

const Footer = () => {
    return (
        <footer class="py-1 bg-theme mt-auto">
            <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                    <small class="text-silver">Copyright &copy; Fashion Club BD {new Date().getFullYear()} | Version: 0.1.0 Beta</small>
                    <small> Développer par <a className={'text-theme'} href="#"> Dev Etien </a> </small>
                        
                </div>
            </div>
        </footer>
    );
};

export default Footer;