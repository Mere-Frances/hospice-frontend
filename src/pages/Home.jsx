import Seo from '../components/Seo';

// components
import HomeHeader from '../components/HomeHeader';
import QuickLinks from '../components/QuickLinks';
import FrequentlyAsked from '../components/FrequentlyAsked';
import Form from '../components/Contact';

const Home = () => {

  return (
    <>
      <Seo
        title="Hospice NZ Home"
        description="Make a difference for those you love."
      />

      <HomeHeader desc="Te Kahu Pairuri o Aotearoa" title="hospice" image_url="/header-bg-imgs/older-couple.jpg" btn="Find out more about hospice" btnLink="/"/>
      <h2 className='page-break-title'>Kia ora,<br/>how can we help you today?</h2>
      <QuickLinks/>

      {/* SOURCES */}
      <h2 className='page-break-title'>Helpful Links</h2>
      <section className='home-sources'>
        <div className='source-container'>
          <div className='source-title'>
            <h3>Your guide to hospice care</h3>
            <p>Watch this short video to get an idea of what hospice is all about, then read our complete guide to end of life care in New Zealand.</p>
            <button className='primary-button'>Watch video</button>
          </div>
          <img src='../public/header-bg-imgs/laughing-women.jpg' alt='Two woman laughing together'/>
        </div>
        <div className='source-container'>
          <div className='source-title'>
            <h3>Find a hospice</h3>
            <p>Find a hospice near you or a loved one with our map of all hospices throughout Aotearoa New Zealand.</p>
            <button className='primary-button'>Find your local hospice</button>
          </div>
          <iframe src="https://www.google.co.nz/maps/d/embed?mid=1sdtknIni8co5q_zchbGEJFE58FC2nJc&ehbc=2E312F&noprof=1" width="650" height="650"></iframe>
        </div>
      </section>

      {/* FAQ */}

      <h2 className='page-break-title'>Frequently asked questions</h2>
      <section className='faq-section'>      
        <FrequentlyAsked title="What is Palliative Care?">
          <p>Palliative care is an approach that improves the quality of life of patients and their families who are facing problems associated with life-threatening illness. It prevents and relieves suffering through the early identification, correct assessment and treatment of pain and other problems, whether physical, psychosocial or spiritual.<br/>
          <br/>Addressing suffering involves taking care of issues beyond physical symptoms. Palliative care uses a team approach to support patients and their caregivers. This includes addressing practical needs and providing bereavement counselling. It offers a support system to help patients live as actively as possible until death.</p>
        </FrequentlyAsked>

        <FrequentlyAsked title="What is Hospice Care?">
          <p>Hospice care focuses on the care, comfort, and quality of life of a person with a serious illness who is approaching the end of life.<br/><br/>
          At some point, it may not be possible to cure a serious illness, or a patient may choose not to undergo certain treatments. Hospice is designed for this situation. The patient beginning hospice care understands that his or her illness is not responding to medical attempts to cure it or to slow the disease's progress.<br/><br/>
          It's important for a patient to discuss hospice care options with their doctor or local hospice. Sometimes, people don't begin hospice care soon enough to take full advantage of the help it offers. Starting hospice early, may be able to provide months of meaningful care and quality time with loved ones.</p>
        </FrequentlyAsked>

        <FrequentlyAsked title="Where is hospice care provided and who provides it?">
          <p>Hospice is a philosophy of care, so it is not tied to a specific place. It can be offered in other settings, such as home, a residential care facility, hospital, or in a hospice center.<br/><br/>
          Hospice care brings together a team of people with special skills — among them nurses, doctors, allied health and whānau support. Everyone works together with the person who is dying, the caregiver, and/or the whānau to provide the physical, emotional, cultural and spiritual support needed.</p>
        </FrequentlyAsked>

        <FrequentlyAsked title="Does Hospice offer Assisted Dying?">
          <p>The right to choose an assisted death was been made legal in New Zealand with the introduction of the <a href='https://www.legislation.govt.nz/act/public/2019/0067/latest/DLM7285905.html'>End of Life Choice</a> Act in November 2021.<br/><br/>
          Every hospice in New Zealand respects the patient’s choice to access a medically assisted death (known as ‘assisted dying’) if they choose.<br/><br/>
          One hospice in New Zealand, Tōtara Hospice provides assisted dying on their premises. The other 31 hospices around the country do not provide the procedure on site. However, all hospice staff everywhere, do everything to provide for the patient right up to the point they have an assisted death and for the whānau afterwards.<br/><br/>
          Regardless of a person's personal wishes or values, hospice staff will care for them and support family and whānau through their grief.<br/><br/>
          Check with your local hospice what is their policy regarding Assisted Dying.</p>
        </FrequentlyAsked>

        <FrequentlyAsked title="Palliative care sit alongside assisted dying">
          <p>Hospices in New Zealand work within the scope of the End of Life Choice Act, not against it. Hospices are engaged in promoting palliative care, not opposing assisted dying.<br/><br/>The philosophy and purpose of palliative care is to neither hasten nor postpone death and through an holistic approach, help patients live fully until the end. <br/>
          Good palliative care is founded on a trusting relationship between patient, family, whānau and the health professional. Dying is a natural process and part of life. The palliative care focus is on helping people to live well until they die.<br/><br/>
          As at January 2024, 681 New Zealanders with a terminal illness had had a medically assisted death. This represents just 1% of those that died since that Act came into law in November 2021.<br/><br/>
          In the same period, just over 20,000 New Zealanders died a natural death under hospice care.<br/> <br/>
          Hospices in New Zealand believe that improving access to hospice and palliative care services should be a priority for Government. We know that 34,000 Kiwis could benefit from palliative care in one year alone.   Fairer funding for palliative care will ensure everyone receives quality care regardless of age, gender, ethnicity, socio-economic status or location.<br/>
          We would like to encourage people to talk about their wishes when it comes to the end of life, informing family and friends what is important to them.</p> 
        </FrequentlyAsked>

        <FrequentlyAsked title="How can I access Bereavement Support?">
          <p>Bereavement and grief is a very personal experience and no two people experience loss in the same way.<br/><br/>
          Hospice services across the country provide emotional, spiritual, cultural, functional and social support. They are there to help support you and your whānau as you navigate life with bereavement and loss.<br/><br/>
          Hospice services, whilst they will differ from hospice to hospice, support patients and their whānau through a diverse range of services which can include art, music, occupational therapy, physiotherapy, counselling, social work, spiritual care, and biography writing.<br/><br/>
          If you and your loved ones need support, please contact your local Hospice Service about access to free-of-charge, confidential grief, and bereavement support.
          <br/><br/>
          <span className='bold-text'>Resources:</span><br/><br/>
          <span className='bold-text'>Websites</span><br/>
          <a href='www.griefcentre.org.nz'>Grief Centre</a><br/>
          <a href='www.skylight.org.nz'>Skylight</a><br/>
          <a href='www.terauora.com'>Te Rau Ora</a><br/>
          <a href='www.leva.co.nz'>Leva</a><br/>
          <a href='www.thelowdown.co.nz'>The Lowdown</a><br/>
          <a href='www.mentalhealth.org.nz'>Mental Health Foundation</a><br/>
          <a href='www.reikotuku.org.nz'>Rei Kotuku</a>
          <br/>
          <br/>
          <span className='bold-text'>Books</span><br/>Resilient Grieving by Lucy Hone<br/>Grief on the Run: How Active Grieving Helped me Cope with Devastating Loss by Julie Zarifeh<br/>Life as a Casketeer by Francis and Kaiora Tipene<br/>The Year of Magical Thinking by Joan Didion<br/>Languages of Loss by Sasha Bates<br/>Grief Journal for the bereaved by Vikki Blundell </p>
        </FrequentlyAsked>

        <FrequentlyAsked title="How can I volunteer at a Hospice?">
          <p>Last year, more than 12,000 people donated their time and talents to support the work of New Zealand hospices – we are so very grateful for the difference they make in our communities.<br/>Volunteers help hospices in a wide range of ways. Many people enjoy volunteering in their local Hospice Shop to help sort, price and sell pre-loved items that have been generously donated by the community. Others volunteer their time driving patients and their whānau to appointments, helping with reception or administration, arranging flowers and more. Each hospice is unique – please contact your local hospice to find out about volunteering opportunities in your area.</p>
        </FrequentlyAsked>
      </section>

      <section className='signup-form-container'>
        <Form/>
      </section>
    </>
  )
}

export default Home
