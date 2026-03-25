import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import Image from 'next/image'
import { logo } from '@/assete/Images'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import Title from './Title'
import { navigation } from '@/Constent'


const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='bg-lightBg pt-10 lg:pt-20 pb-6'>
      <Container className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* Company Info Section */}
        <div className='space-y-4'>
          <Link href={"/"} className='inline-block'>
            <Image src={logo} alt='FooterLogo' width={150} height={50} className='h-auto' />
          </Link>
          <p className='text-sm text-gray-600 leading-relaxed'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, fuga numquam. 
            Laudantium quis quibusdam unde non quaerat itaque debitis expedita.
          </p>
          
          {/* Social Media Icons */}
          <div className='flex items-center gap-3 pt-2'>
            <Link 
              href="https://facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              className='bg-themeColor/10 hover:bg-themeColor text-themeColor hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className='bg-themeColor/10 hover:bg-themeColor text-themeColor hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className='bg-themeColor/10 hover:bg-themeColor text-themeColor hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className='bg-themeColor/10 hover:bg-themeColor text-themeColor hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </Link>
            <Link 
              href="https://youtube.com" 
              target="_blank"
              rel="noopener noreferrer"
              className='bg-themeColor/10 hover:bg-themeColor text-themeColor hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'
              aria-label="YouTube"
            >
              <FaYoutube size={18} />
            </Link>
          </div>
        </div>

        {/* Quick Links Section */}
<div className='space-y-4'>
  <Title>My Account</Title>
  <ul className="flex flex-col items-start gap-3">
    {navigation.map((item, index) => (
      <li key={index}>
        <Link 
          href={item.href} 
          className='text-gray-600 hover:text-themeColor transition-colors duration-200'
        >
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
</div>

        {/* Customer Service Section */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800'>Customer Service</h3>
          <ul className='space-y-3'>
            <li>
              <Link href="/shipping" className='text-gray-600 hover:text-themeColor transition-colors duration-200'>
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/returns" className='text-gray-600 hover:text-themeColor transition-colors duration-200'>
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/privacy" className='text-gray-600 hover:text-themeColor transition-colors duration-200'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className='text-gray-600 hover:text-themeColor transition-colors duration-200'>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/support" className='text-gray-600 hover:text-themeColor transition-colors duration-200'>
                Support Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Newsletter Section */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800'>Get In Touch</h3>
          <div className='space-y-3 text-gray-600'>
            <p className='flex items-start gap-2'>
              <span className='font-medium'>📍</span>
              123 Business Street, Suite 100<br />
              New York, NY 10001
            </p>
            <p className='flex items-center gap-2'>
              <span className='font-medium'>📞</span>
              <a href="tel:+1234567890" className='hover:text-themeColor transition-colors'>
                (123) 456-7890
              </a>
            </p>
            <p className='flex items-center gap-2'>
              <span className='font-medium'>✉️</span>
              <a href="mailto:info@example.com" className='hover:text-themeColor transition-colors'>
                info@example.com
              </a>
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className='pt-2'>
            <h4 className='text-md font-medium text-gray-800 mb-2'>Subscribe to Newsletter</h4>
            <form className='flex flex-col sm:flex-row gap-2'>
              <input
                type="email"
                placeholder="Your email"
                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-themeColor flex-1'
                required
              />
              <button
                type="submit"
                className='bg-themeColor text-white px-4 py-2 rounded-lg hover:bg-themeColor/90 transition-colors whitespace-nowrap'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <Container className='mt-12 pt-6 border-t border-gray-200'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600'>
          <p>
            &copy; {currentYear} Your Company. All rights reserved.
          </p>
          <div className='flex items-center gap-6'>
            <Link href="/privacy" className='hover:text-themeColor transition-colors'>
              Privacy
            </Link>
            <Link href="/terms" className='hover:text-themeColor transition-colors'>
              Terms
            </Link>
            <Link href="/sitemap" className='hover:text-themeColor transition-colors'>
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer