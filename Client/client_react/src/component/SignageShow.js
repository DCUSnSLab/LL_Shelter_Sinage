import React, { useState } from 'react';
import axios from "axios"

function ContentDetailView() {
    return (

        <html>
        <head>
            <title>Elements - Phantom by HTML5 UP</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
            <link rel="stylesheet" href="assets/css/main.css"/>
            <noscript>
                <link rel="stylesheet" href="assets/css/noscript.css"/>
            </noscript>
        </head>
        <body className="is-preload">

        <div id="wrapper">


            <header id="header">
                <div className="inner">


                    <a href="index.html" className="logo">
                        <span className="symbol"><img src="images/logo.svg" alt=""/></span><span
                        className="title">Phantom</span>
                    </a>


                    <nav>
                        <ul>
                            <li><a href="#menu">Menu</a></li>
                        </ul>
                    </nav>

                </div>
            </header>


            <nav id="menu">
                <h2>Menu</h2>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="generic.html">Ipsum veroeros</a></li>
                    <li><a href="generic.html">Tempus etiam</a></li>
                    <li><a href="generic.html">Consequat dolor</a></li>
                    <li><a href="elements.html">Elements</a></li>
                </ul>
            </nav>


            <div id="main">
                <div className="inner">
                    <h1>Elements</h1>


                    <section>
                        <h2>Text</h2>
                        <p>This is <b>bold</b> and this is <strong>strong</strong>. This is <i>italic</i> and this
                            is <em>emphasized</em>.
                            This is <sup>superscript</sup> text and this is <sub>subscript</sub> text.
                            This is <u>underlined</u> and this is code: <code></code>. Finally, <a
                                href="#">this is a link</a>.</p>
                        <hr/>
                        <p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida odio porttitor sem non mi
                            integer non faucibus ornare mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia
                            sapien lorem accumsan varius montes viverra nibh in adipiscing blandit tempus accumsan.</p>
                        <hr/>
                        <h2>Heading Level 2</h2>
                        <h3>Heading Level 3</h3>
                        <h4>Heading Level 4</h4>
                        <hr/>
                        <h3>Blockquote</h3>
                        <blockquote>Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget
                            tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu
                            felis iaculis volutpat ac adipiscing accumsan faucibus. Vestibulum ante ipsum primis in
                            faucibus lorem ipsum dolor sit amet nullam adipiscing eu felis.
                        </blockquote>
                        <h3>Preformatted</h3>
                        <pre>
{/*                            <code>i = 0;*/}

{/*while (!deck.isInOrder()) {*/}
{/*                                'Iteration ' + i;*/}
{/*                                deck.shuffle();*/}
{/*                                i++;*/}
{/*                            }*/}

{/*                            print 'It took ' + i + ' iterations to sort the deck.';</code>  */}
                        </pre>
                    </section>


                    <section>
                        <h2>Lists</h2>
                        <div className="row">
                            <div className="col-6 col-12-medium">
                                <h3>Unordered</h3>
                                <ul>
                                    <li>Dolor pulvinar etiam.</li>
                                    <li>Sagittis adipiscing.</li>
                                    <li>Felis enim feugiat.</li>
                                </ul>
                                <h3>Alternate</h3>
                                <ul className="alt">
                                    <li>Dolor pulvinar etiam.</li>
                                    <li>Sagittis adipiscing.</li>
                                    <li>Felis enim feugiat.</li>
                                </ul>
                            </div>
                            <div className="col-6 col-12-medium">
                                <h3>Ordered</h3>
                                <ol>
                                    <li>Dolor pulvinar etiam.</li>
                                    <li>Etiam vel felis viverra.</li>
                                    <li>Felis enim feugiat.</li>
                                    <li>Dolor pulvinar etiam.</li>
                                    <li>Etiam vel felis lorem.</li>
                                    <li>Felis enim et feugiat.</li>
                                </ol>
                                <h3>Icons</h3>
                                <ul className="icons">
                                    <li><a href="#" className="icon brands style1 fa-twitter"><span
                                        className="label">Twitter</span></a></li>
                                    <li><a href="#" className="icon brands style1 fa-facebook-f"><span
                                        className="label">Facebook</span></a></li>
                                    <li><a href="#" className="icon brands style1 fa-instagram"><span
                                        className="label">Instagram</span></a></li>
                                    <li><a href="#" className="icon brands style1 fa-github"><span
                                        className="label">Github</span></a></li>
                                </ul>
                                <ul className="icons">
                                    <li><a href="#" className="icon brands style2 fa-twitter"><span
                                        className="label">Twitter</span></a></li>
                                    <li><a href="#" className="icon brands style2 fa-facebook-f"><span
                                        className="label">Facebook</span></a></li>
                                    <li><a href="#" className="icon brands style2 fa-instagram"><span
                                        className="label">Instagram</span></a></li>
                                    <li><a href="#" className="icon brands style2 fa-github"><span
                                        className="label">Github</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <h2>Actions</h2>
                        <div className="row">
                            <div className="col-6 col-12-medium">
                                <ul className="actions">
                                    <li><a href="#" className="button primary">Default</a></li>
                                    <li><a href="#" className="button">Default</a></li>
                                </ul>
                                <ul className="actions small">
                                    <li><a href="#" className="button primary small">Small</a></li>
                                    <li><a href="#" className="button small">Small</a></li>
                                </ul>
                                <ul className="actions stacked">
                                    <li><a href="#" className="button primary">Default</a></li>
                                    <li><a href="#" className="button">Default</a></li>
                                </ul>
                                <ul className="actions stacked">
                                    <li><a href="#" className="button primary small">Small</a></li>
                                    <li><a href="#" className="button small">Small</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-12-medium">
                                <ul className="actions stacked">
                                    <li><a href="#" className="button primary fit">Default</a></li>
                                    <li><a href="#" className="button fit">Default</a></li>
                                </ul>
                                <ul className="actions stacked">
                                    <li><a href="#" className="button primary small fit">Small</a></li>
                                    <li><a href="#" className="button small fit">Small</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>


                    <section>
                        <h2>Table</h2>
                        <h3>Default</h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Item One</td>
                                    <td>Ante turpis integer aliquet porttitor.</td>
                                    <td>29.99</td>
                                </tr>
                                <tr>
                                    <td>Item Two</td>
                                    <td>Vis ac commodo adipiscing arcu aliquet.</td>
                                    <td>19.99</td>
                                </tr>
                                <tr>
                                    <td>Item Three</td>
                                    <td> Morbi faucibus arcu accumsan lorem.</td>
                                    <td>29.99</td>
                                </tr>
                                <tr>
                                    <td>Item Four</td>
                                    <td>Vitae integer tempus condimentum.</td>
                                    <td>19.99</td>
                                </tr>
                                <tr>
                                    <td>Item Five</td>
                                    <td>Ante turpis integer aliquet porttitor.</td>
                                    <td>29.99</td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan="2"></td>
                                    <td>100.00</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>

                        <h3>Alternate</h3>
                        <div className="table-wrapper">
                            <table className="alt">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Item One</td>
                                    <td>Ante turpis integer aliquet porttitor.</td>
                                    <td>29.99</td>
                                </tr>
                                <tr>
                                    <td>Item Two</td>
                                    <td>Vis ac commodo adipiscing arcu aliquet.</td>
                                    <td>19.99</td>
                                </tr>
                                <tr>
                                    <td>Item Three</td>
                                    <td> Morbi faucibus arcu accumsan lorem.</td>
                                    <td>29.99</td>
                                </tr>
                                <tr>
                                    <td>Item Four</td>
                                    <td>Vitae integer tempus condimentum.</td>
                                    <td>19.99</td>
                                </tr>
                                <tr>
                                    <td>Item Five</td>
                                    <td>Ante turpis integer aliquet porttitor.</td>
                                    <td>29.99</td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan="2"></td>
                                    <td>100.00</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </section>


                    <section>
                        <h3>Buttons</h3>
                        <ul className="actions">
                            <li><a href="#" className="button primary">Primary</a></li>
                            <li><a href="#" className="button">Default</a></li>
                        </ul>
                        <ul className="actions">
                            <li><a href="#" className="button large">Large</a></li>
                            <li><a href="#" className="button">Default</a></li>
                            <li><a href="#" className="button small">Small</a></li>
                        </ul>
                        <ul className="actions fit">
                            <li><a href="#" className="button primary fit">Fit</a></li>
                            <li><a href="#" className="button fit">Fit</a></li>
                            <li><a href="#" className="button fit">Fit</a></li>
                        </ul>
                        <ul className="actions fit small">
                            <li><a href="#" className="button primary fit small">Fit + Small</a></li>
                            <li><a href="#" className="button fit small">Fit + Small</a></li>
                            <li><a href="#" className="button fit small">Fit + Small</a></li>
                        </ul>
                        <ul className="actions">
                            <li><a href="#" className="button primary icon solid fa-download">Icon</a></li>
                            <li><a href="#" className="button icon solid fa-upload">Icon</a></li>
                            <li><a href="#" className="button icon solid fa-save">Icon</a></li>
                        </ul>
                        <ul className="actions">
                            <li><span className="button primary disabled">Disabled</span></li>
                            <li><span className="button disabled">Disabled</span></li>
                        </ul>
                    </section>

                    <section>
                        <h2>Form</h2>
                        <form method="post" action="#">
                            <div className="row gtr-uniform">
                                <div className="col-6 col-12-xsmall">
                                    <input type="text" name="demo-name" id="demo-name" value="" placeholder="Name"/>
                                </div>
                                <div className="col-6 col-12-xsmall">
                                    <input type="email" name="demo-email" id="demo-email" value="" placeholder="Email"/>
                                </div>
                                <div className="col-12">
                                    <select name="demo-category" id="demo-category">
                                        <option value="">- Category -</option>
                                        <option value="1">Manufacturing</option>
                                        <option value="1">Shipping</option>
                                        <option value="1">Administration</option>
                                        <option value="1">Human Resources</option>
                                    </select>
                                </div>
                                <div className="col-4 col-12-small">
                                    <input type="radio" id="demo-priority-low" name="demo-priority" checked/>
                                        <label htmlFor="demo-priority-low">Low</label>
                                </div>
                                <div className="col-4 col-12-small">
                                    <input type="radio" id="demo-priority-normal" name="demo-priority"/>
                                        <label htmlFor="demo-priority-normal">Normal</label>
                                </div>
                                <div className="col-4 col-12-small">
                                    <input type="radio" id="demo-priority-high" name="demo-priority"/>
                                        <label htmlFor="demo-priority-high">High</label>
                                </div>
                                <div className="col-6 col-12-small">
                                    <input type="checkbox" id="demo-copy" name="demo-copy"/>
                                        <label htmlFor="demo-copy">Email me a copy</label>
                                </div>
                                <div className="col-6 col-12-small">
                                    <input type="checkbox" id="demo-human" name="demo-human" checked/>
                                        <label htmlFor="demo-human">Not a robot</label>
                                </div>
                                <div className="col-12">
                                    <textarea name="demo-message" id="demo-message" placeholder="Enter your message"
                                              rows="6"></textarea>
                                </div>
                                <div className="col-12">
                                    <ul className="actions">
                                        <li><input type="submit" value="Send Message" className="primary"/></li>
                                        <li><input type="reset" value="Reset"/></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </section>

                    <section>
                        <h2>Image</h2>
                        <h3>Fit</h3>
                        <div className="box alt">
                            <div className="row gtr-uniform">
                                <div className="col-12"><span className="image fit"><img src="images/pic13.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic01.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic02.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic03.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic03.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic01.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic02.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic02.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic03.jpg" alt=""/></span>
                                </div>
                                <div className="col-4"><span className="image fit"><img src="images/pic01.jpg" alt=""/></span>
                                </div>
                            </div>
                        </div>
                        <h3>Left &amp; Right</h3>
                    </section>

                </div>
            </div>


            <footer id="footer">
                <div className="inner">
                    <section>
                        <h2>Get in touch</h2>
                        <form method="post" action="#">
                            <div className="fields">
                                <div className="field half">
                                    <input type="text" name="name" id="name" placeholder="Name"/>
                                </div>
                                <div className="field half">
                                    <input type="email" name="email" id="email" placeholder="Email"/>
                                </div>
                                <div className="field">
                                    <textarea name="message" id="message" placeholder="Message"></textarea>
                                </div>
                            </div>
                            <ul className="actions">
                                <li><input type="submit" value="Send" className="primary"/></li>
                            </ul>
                        </form>
                    </section>
                    <section>
                        <h2>Follow</h2>
                        <ul className="icons">
                            <li><a href="#" className="icon brands style2 fa-twitter"><span
                                className="label">Twitter</span></a></li>
                            <li><a href="#" className="icon brands style2 fa-facebook-f"><span
                                className="label">Facebook</span></a></li>
                            <li><a href="#" className="icon brands style2 fa-instagram"><span
                                className="label">Instagram</span></a></li>
                            <li><a href="#" className="icon brands style2 fa-dribbble"><span
                                className="label">Dribbble</span></a></li>
                            <li><a href="#" className="icon brands style2 fa-github"><span
                                className="label">GitHub</span></a></li>
                            <li><a href="#" className="icon brands style2 fa-500px"><span className="label">500px</span></a>
                            </li>
                            <li><a href="#" className="icon solid style2 fa-phone"><span className="label">Phone</span></a>
                            </li>
                            <li><a href="#" className="icon solid style2 fa-envelope"><span
                                className="label">Email</span></a></li>
                        </ul>
                    </section>
                    <ul className="copyright">
                        <li>&copy; Untitled. All rights reserved</li>
                        <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul>
                </div>
            </footer>

        </div>


        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/browser.min.js"></script>
        <script src="assets/js/breakpoints.min.js"></script>
        <script src="assets/js/util.js"></script>
        <script src="assets/js/main.js"></script>

        </body>
        </html>
    )
}
export default ContentDetailView;
