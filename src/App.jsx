import React, { useMemo, useState } from 'react';
import {
  Lock,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Plus,
  Search,
  User,
  Shield,
  Calendar,
  FileText,
  AlertCircle,
  Info,
  CheckCircle2,
  BadgeCheck,
  Building2,
  ArrowRight,
  ShieldCheck,
  X,
  Sparkles,
  Eye,
  EyeOff,
  Languages,
  Sun,
  Moon,
  Download,
  Edit3,
  Trash2,
  RotateCcw,
  Bell,
  Printer,
  Filter,
  MapPin,
} from 'lucide-react';

// --- LOCALIZATION DICTIONARIES ---
const TRANSLATIONS = {
  en: {
    heroTitleFirst: 'Delightful sanctuary operations',
    heroTitleSecond: 'start here.',
    heroSub: 'Manage parish events, DSR venue requests, Cathedral schedules, and approval workflows in one centralized portal.',
    createFirstEvent: 'File Venue Request',
    exploreFacilities: 'Explore Facilities',
    signIn: 'Sign In',
    welcomeLuma: 'Welcome to San Pedro Cathedral Portal',
    pleaseSignIn: 'Please sign in with your parish credentials to continue.',
    emailLabel: 'Email or Username',
    passwordLabel: 'Password',
    continueWithEmail: 'Continue to Dashboard',
    simulationTitle: 'Quick Select Preset Role',
    staffRequester: 'Staff / Requester',
    parishApprover: 'Parish Approver',
    administrator: 'Administrator',
    closePortal: 'Close Portal',
    dashboard: 'Dashboard',
    auditReports: 'Audit Log & Reports',
    availability: 'Venue Availability',
    totalDSRs: 'Total DSR Records',
    pending: 'Pending',
    inReview: 'In Review',
    approved: 'Approved',
    rejected: 'Rejected',
    returned: 'Returned',
    completed: 'Completed',
    requestVenueBtn: 'New DSR Request',
    searchPlaceholder: 'Search reference, requester, date, status, ministry...',
    dssTitle: 'Decision Support System - Parish Guidance',
    dssSub: 'Simple recommendations for requesters, approvers, and admins.',
    targetRoom: 'Venue / Facility',
    ministry: 'Ministry / Requesting Group',
    eventType: 'Specific Event Type',
    priestApprover: 'Priest / Clergy Approver',
    reservationDate: 'Event Date',
    reservationTime: 'Time Window',
    liturgicalPurpose: 'Purpose / Event Description',
    signedLetter: 'Signed Request Letter',
    requestNotes: 'Notes / Equipment Needed',
    submitBooking: 'Submit DSR',
    saveDraft: 'Save as Draft',
    cancel: 'Cancel',
    actionsRestricted: 'Only approvers and administrators can approve, reject, or return this DSR.',
  },
  tl: {
    heroTitleFirst: 'Ang maayos na operasyon ng katedral',
    heroTitleSecond: 'ay nagsisimula rito.',
    heroSub: 'Pamahalaan ang mga parish event, DSR venue requests, iskedyul ng Katedral, at approval workflow sa iisang portal.',
    createFirstEvent: 'Maghain ng Venue Request',
    exploreFacilities: 'Tingnan ang Facilities',
    signIn: 'Mag-sign In',
    welcomeLuma: 'Maligayang Pagdating sa San Pedro Cathedral Portal',
    pleaseSignIn: 'Mag-sign in gamit ang parish credentials.',
    emailLabel: 'Email o Username',
    passwordLabel: 'Password',
    continueWithEmail: 'Magpatuloy sa Dashboard',
    simulationTitle: 'Piliin ang Role',
    staffRequester: 'Staff / Humihiling',
    parishApprover: 'Tagapag-apruba',
    administrator: 'Tagapangasiwa',
    closePortal: 'Isara',
    dashboard: 'Dashboard',
    auditReports: 'Audit Log at Reports',
    availability: 'Availability ng Venue',
    totalDSRs: 'Kabuuang DSR',
    pending: 'Nakabinbin',
    inReview: 'Sinusuri',
    approved: 'Aprubado',
    rejected: 'Tinanggihan',
    returned: 'Ibinalik',
    completed: 'Tapos na',
    requestVenueBtn: 'Bagong DSR Request',
    searchPlaceholder: 'Hanapin ang reference, requester, petsa, status...',
    dssTitle: 'Decision Support System - Gabay ng Parokya',
    dssSub: 'Simpleng rekomendasyon para sa requester, approver, at admin.',
    targetRoom: 'Venue / Pasilidad',
    ministry: 'Ministry / Grupo',
    eventType: 'Uri ng Gawain',
    priestApprover: 'Pari / Clergy Approver',
    reservationDate: 'Petsa ng Event',
    reservationTime: 'Oras',
    liturgicalPurpose: 'Layunin / Deskripsyon',
    signedLetter: 'Pirmadong Request Letter',
    requestNotes: 'Notes / Kagamitang Kailangan',
    submitBooking: 'Ipasa ang DSR',
    saveDraft: 'I-save bilang Draft',
    cancel: 'Kanselahin',
    actionsRestricted: 'Approver at administrator lamang ang maaaring mag-apruba, tumanggi, o magbalik ng DSR.',
  },
  ceb: {
    signIn: 'Sulod',
    welcomeLuma: 'Maayong pag-abot sa San Pedro Cathedral Portal',
    pleaseSignIn: 'Palihug sulod gamit ang parish credentials.',
    emailLabel: 'Email o Username',
    passwordLabel: 'Password',
    continueWithEmail: 'Padayon sa Dashboard',
    simulationTitle: 'Paspas nga Pagpili sa Role',
    staffRequester: 'Staff / Requester',
    parishApprover: 'Parish Approver',
    administrator: 'Administrator',
    closePortal: 'Sirad-i',
    dashboard: 'Dashboard',
    auditReports: 'Audit Log ug Reports',
    availability: 'Venue Availability',
    totalDSRs: 'Total DSR',
    pending: 'Pending',
    inReview: 'Gina-review',
    approved: 'Approved',
    rejected: 'Rejected',
    returned: 'Gibalik',
    completed: 'Nahuman',
    requestVenueBtn: 'Bag-ong DSR Request',
    searchPlaceholder: 'Pangitaa ang reference, requester, petsa, status...',
    dssTitle: 'Decision Support System - Giya sa Parokya',
    dssSub: 'Yano nga rekomendasyon para sa requester, approver, ug admin.',
    targetRoom: 'Venue / Pasilidad',
    ministry: 'Ministry / Grupo',
    eventType: 'Klase sa Kalihokan',
    priestApprover: 'Pari / Clergy Approver',
    reservationDate: 'Petsa sa Event',
    reservationTime: 'Oras',
    liturgicalPurpose: 'Katuyoan / Deskripsyon',
    signedLetter: 'Pirmadong Request Letter',
    requestNotes: 'Notes / Gamit nga Kinahanglan',
    submitBooking: 'Isumite ang DSR',
    saveDraft: 'I-save isip Draft',
    cancel: 'I-kansela',
    actionsRestricted: 'Approver ug administrator ra ang maka-approve, reject, o return sa DSR.',
  },
};

const PRESET_ACCOUNTS = {
  admin: { email: 'admin@sanpedro.cathedral.org', password: 'Password123!', name: 'Jervin Andoy', role: 'Administrator', avatar: '⛪' },
  staff: { email: 'requester@test.com', password: 'Password123!', name: 'Test Requester', role: 'Staff Requester', avatar: '✍️' },
  approver: { email: 'approver@test.com', password: 'Password123!', name: 'Parish Secretary', role: 'Parish Approver', avatar: '🛡️' },
};

const MINISTRIES = [
  'Knights of the Altar Servers',
  'Parish Youth Apostolate',
  'Confraternity of the Our Lady of Lourdes',
  'Music Ministry',
  'Eucharistic Ministers of Holy Communion',
  'Catholic Lay Apologists',
  'Catechists',
];

const VENUES = [
  { name: 'Mezzanine Hall A', capacity: 80, status: 'ACTIVE', chapel: false },
  { name: 'Mezzanine Hall B', capacity: 80, status: 'ACTIVE', chapel: false },
  { name: 'Mezzanine Hall (Whole A & B)', capacity: 180, status: 'ACTIVE', chapel: false },
  { name: 'Socio Hall', capacity: 220, status: 'ACTIVE', chapel: false },
  { name: 'Auditorium', capacity: 500, status: 'ACTIVE', chapel: false },
  { name: 'Meeting Room 1', capacity: 35, status: 'ACTIVE', chapel: false },
  { name: 'Meeting Room 2', capacity: 35, status: 'ACTIVE', chapel: false },
  { name: 'Parish Rectory', capacity: 25, status: 'ACTIVE', chapel: false },
  { name: 'Blessed Sacrament Chapel', capacity: 70, status: 'ACTIVE', chapel: true },
  { name: 'Chapel of the Saints', capacity: 60, status: 'ACTIVE', chapel: true },
];

const EVENT_TYPES = [
  'Seminar / Formation',
  'Symposium',
  'Practicum / Music Practice',
  'Meeting',
  'Holding Area',
  'Dining Area',
  'Preparation Room',
];

const PRIESTS = [
  'Msgr. Paul A. Cuison, JCD',
  'Rev. Fr. Amiel E. Arado',
  'Rev. Fr. Evan B. Esmade, CP',
  'Rev. Fr. Junel Bustamante',
  'Most Rev. Romulo G. Valles, D.D.',
];

const BUSY_MONTHS = {
  0: 'January: Feast of the Santo Niño, Jesus Nazareno, lector recruitment, Bible Month, and Bible symposiums.',
  1: 'February: Regular pastoral meetings and ordinary ministry schedules.',
  2: 'March: Lent preparations, meetings, and practices are expected.',
  3: 'April: Holy Week, recollections, lectures, confessions, gatherings, meetings, and practices may make venues very busy.',
  4: 'May: Month of Flores de Mayo and ministry recruitment. Daily catechism sessions may occur, so Mezzanine Halls and Socio Hall are often requested by the Confraternity of Our Lady of Lourdes, Catechists, and Youth Leaders.',
  5: 'June: Cathedral fiesta celebrations, meetings, and practices may increase demand.',
  6: 'July: Regular ministry meeting schedules.',
  7: 'August: Regular ministry meeting schedules.',
  8: 'September: Vocation Month may increase formation activities.',
  9: 'October: Month of the Holy Rosary plus regular ministry meetings.',
  10: 'November: Advent preparations begin; meetings and practices increase.',
  11: 'December: Advent recollections, confessions, Christmas celebrations, holding areas, preparation rooms, meetings, and practices are common.',
};

const INITIAL_BOOKINGS = [
  {
    id: 'DSR-2026-001',
    venue: 'Mezzanine Hall (Whole A & B)',
    ministry: 'Catechists',
    eventType: 'Seminar / Formation',
    purpose: 'Flores de Mayo Catechism Session',
    requester: 'Test Requester',
    requesterEmail: 'requester@test.com',
    date: '2026-05-30',
    time: '09:00 AM - 11:00 AM',
    status: 'Approved',
    priority: 'High',
    priest: 'Msgr. Paul A. Cuison, JCD',
    hasLetter: true,
    signedLetterName: 'signed-request-letter.pdf',
    submittedAt: '2026-05-26',
    approvalTimestamp: '2026-05-26 02:46 PM',
    remarks: 'Approved. Signed letter received.',
    history: [
      { status: 'Submitted', user: 'Test Requester', date: '2026-05-26 02:46 PM', notes: 'DSR submitted with signed request letter.' },
      { status: 'Approved', user: 'Parish Secretary', date: '2026-05-26 02:46 PM', notes: 'Approved by Msgr. Paul A. Cuison, JCD.' },
    ],
  },
  {
    id: 'DSR-2026-002',
    venue: 'Auditorium',
    ministry: 'Music Ministry',
    eventType: 'Practicum / Music Practice',
    purpose: 'Cathedral Fiesta Music Practice',
    requester: 'Test Requester',
    requesterEmail: 'requester@test.com',
    date: '2026-06-05',
    time: '07:00 PM - 09:00 PM',
    status: 'Pending',
    priority: 'Medium',
    priest: 'Rev. Fr. Amiel E. Arado',
    hasLetter: true,
    signedLetterName: 'signed-request-letter.pdf',
    submittedAt: '2026-05-27',
    approvalTimestamp: '',
    remarks: '',
    history: [
      { status: 'Submitted', user: 'Test Requester', date: '2026-05-27 09:45 PM', notes: 'Needs microphone and keyboard area.' },
    ],
  },
  {
    id: 'DSR-2026-003',
    venue: 'Blessed Sacrament Chapel',
    ministry: 'Parish Youth Apostolate',
    eventType: 'Dining Area',
    purpose: 'Youth Fellowship Meal',
    requester: 'Test Requester',
    requesterEmail: 'requester@test.com',
    date: '2026-05-31',
    time: '12:00 PM - 01:00 PM',
    status: 'Returned',
    priority: 'High',
    priest: 'Rev. Fr. Evan B. Esmade, CP',
    hasLetter: false,
    signedLetterName: '',
    submittedAt: '2026-05-27',
    approvalTimestamp: '',
    remarks: 'Dining area is not allowed in chapels. Please select Socio Hall or Mezzanine Hall.',
    history: [
      { status: 'Submitted', user: 'Test Requester', date: '2026-05-27 08:30 AM', notes: 'Initial request.' },
      { status: 'Returned', user: 'Parish Secretary', date: '2026-05-27 10:10 AM', notes: 'Venue-event mismatch. Revision needed.' },
    ],
  },
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginRole, setLoginRole] = useState('staff');
  const [loginEmail, setLoginEmail] = useState('requester@test.com');
  const [loginPassword, setLoginPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [users, setUsers] = useState(Object.values(PRESET_ACCOUNTS));
  const [notifications, setNotifications] = useState([]);
  const [activePage, setActivePage] = useState('dashboard');
  const [publicView, setPublicView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [approvalTab, setApprovalTab] = useState('queue');
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportSearch, setReportSearch] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('All');
  const [reportDate, setReportDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(INITIAL_BOOKINGS[0]);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState('');
  const [toasts, setToasts] = useState([]);
  const [venues, setVenues] = useState(VENUES);
  const [isNewVenueOpen, setIsNewVenueOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [approvalRemarks, setApprovalRemarks] = useState('');
  const [revisionRemarks, setRevisionRemarks] = useState('');
  const [emailRecipient, setEmailRecipient] = useState('All Users');
  const [emailMessage, setEmailMessage] = useState('');
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'Staff Requester', password: 'Password123!', avatar: '👤' });
  const [userEditId, setUserEditId] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterMinistry, setFilterMinistry] = useState('All');
  const [showApproverArchive, setShowApproverArchive] = useState(false);
  const [availabilityView, setAvailabilityView] = useState('list');
  const [availabilityVenue, setAvailabilityVenue] = useState('All Venues');

  const [form, setForm] = useState({
    venue: venues[0].name,
    ministry: MINISTRIES[0],
    eventType: EVENT_TYPES[0],
    purpose: '',
    date: '',
    time: '',
    priority: 'Medium',
    priest: PRIESTS[0],
    recurrenceType: 'None',
    recurrenceCount: 1,
    hasLetter: false,
    signedLetterName: '',
    signedLetterFile: null,
    signedLetterUrl: '',
    notes: '',
  });
  const [newVenueForm, setNewVenueForm] = useState({ name: '', capacity: '', location: '', amenities: '', contact: '', notes: '', chapel: false });

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  const isAdmin = currentUser?.role === 'Administrator';
  const isApprover = currentUser?.role === 'Parish Approver';
  const canDecide = isAdmin || isApprover;

  const wrapperClass = theme === 'dark' ? 'bg-[#030712] text-zinc-100' : 'bg-[#f8fafc] text-slate-800';
  const containerClass = theme === 'dark' ? 'bg-zinc-950/60 backdrop-blur-md border border-zinc-900 shadow-xl' : 'bg-white border border-slate-200 shadow-sm';
  const inputClass = theme === 'dark' ? 'bg-[#18181b] border-zinc-800 text-zinc-100 placeholder:text-zinc-600' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400';
  const textMutedClass = theme === 'dark' ? 'text-zinc-400' : 'text-slate-500';
  const textHeadingClass = theme === 'dark' ? 'text-white' : 'text-slate-900';

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 4200);
  };

  const loginRoleLabel = {
    staff: 'Staff Access',
    approver: 'Approver Access',
    admin: 'Admin Access',
  }[loginRole] || 'Portal Access';

  const handleRoleSelect = (roleKey) => {
    const acc = PRESET_ACCOUNTS[roleKey];
    setLoginRole(roleKey);
    setLoginEmail(acc.email);
    setLoginPassword(acc.password);
    setValidationErrors({});
    showToast(`Selected ${acc.role} sign-in`, 'info');
  };

  const handleExploreFacilities = (e) => {
    e?.preventDefault();
    setPublicView('explore');
    showToast('Explore Facilities page loaded.', 'info');
  };

  const handleLogin = (e) => {
    e?.preventDefault();
    setLoading(true);
    const errors = {};
    if (!loginEmail.trim()) errors.email = `${t('emailLabel')} is required.`;
    if (!loginPassword.trim()) errors.password = `${t('passwordLabel')} is required.`;
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      showToast('Please fill out all login credentials.', 'error');
      setLoading(false);
      return;
    }

    const matchedUser = users.find(
      (acc) => acc.email.toLowerCase() === loginEmail.trim().toLowerCase() && acc.password === loginPassword
    );

    const expectedRoleMap = {
      staff: 'Staff Requester',
      approver: 'Parish Approver',
      admin: 'Administrator',
    };

    if (!matchedUser) {
      setValidationErrors({ auth: 'Access denied. Credentials were not recognized.' });
      showToast('Authentication failed.', 'error');
      setLoading(false);
      return;
    }

    if (matchedUser.role !== expectedRoleMap[loginRole]) {
      setValidationErrors({ auth: 'This sign-in path does not match the selected access type.' });
      showToast('Selected role does not match the account.', 'error');
      setLoading(false);
      return;
    }

    setCurrentUser(matchedUser);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setActivePage('dashboard');
    setLoading(false);
    showToast(`Signed in as ${matchedUser.name}`, 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowLoginModal(false);
    showToast('Securely signed out.', 'info');
  };

  const getMonthAdvice = (dateValue = form.date) => {
    if (!dateValue) return 'Select an event date so the DSS can explain the expected parish season and possible venue pressure.';
    const month = new Date(`${dateValue}T00:00:00`).getMonth();
    return BUSY_MONTHS[month] || 'Regular parish operations expected.';
  };

  const getVenueAdvice = (venueName = form.venue, eventType = form.eventType, ministry = form.ministry) => {
    const venue = venues.find((v) => v.name === venueName);
    const advice = [];
    if (venue?.chapel && ['Dining Area', 'Preparation Room'].includes(eventType)) {
      advice.push('This event type is not allowed in chapels. Choose Socio Hall, Auditorium, or Mezzanine Hall instead.');
    }
    if (venueName.includes('Mezzanine') || venueName === 'Socio Hall') {
      advice.push('This venue is commonly useful for catechism, recruitment, meetings, and formation activities.');
    }
    if (ministry === 'Music Ministry' && eventType.includes('Music')) {
      advice.push('Music-related requests may need microphone, keyboard, chairs, and clear setup time.');
    }
    if (form.date && bookings.some((b) => b.date === form.date && b.venue === venueName && ['Pending', 'In Review', 'Approved'].includes(b.status))) {
      advice.push('Possible schedule conflict: another active DSR exists for this venue and date.');
    }
    return advice.length ? advice : ['No major conflict detected. The request can proceed if a signed request letter is attached.'];
  };

  const roleDssCards = useMemo(() => {
    const pending = bookings.filter((b) => b.status === 'Pending' || b.status === 'In Review').length;
    const approved = bookings.filter((b) => b.status === 'Approved').length;
    const rejected = bookings.filter((b) => b.status === 'Rejected').length;
    const returned = bookings.filter((b) => b.status === 'Returned').length;
    const busiestVenue = venues.map((v) => ({
      venue: v.name,
      count: bookings.filter((b) => b.venue === v.name).length,
    })).sort((a, b) => b.count - a.count)[0];

    if (currentUser?.role === 'Staff Requester') {
      return [
        { title: 'Requester DSS Notice', body: `Today is ${new Date().toLocaleString('en-US', { month: 'long' })}. ${getMonthAdvice(new Date().toISOString().split('T')[0])}` },
        { title: 'Before You Submit', body: 'Prepare a signed request letter, choose the ministry name, select the exact venue, and describe the purpose clearly.' },
        { title: 'Venue Tip', body: 'For dining or preparation rooms, avoid chapels. Use Socio Hall, Auditorium, or Mezzanine Hall instead.' },
      ];
    }

    if (currentUser?.role === 'Parish Approver') {
      return [
        { title: 'Pending Queue', body: `${pending} DSR record(s) need review. Check signed letters, date conflict, and venue-event compatibility first.` },
        { title: 'Decision Reminder', body: 'Approval should capture priest/clergy approver, timestamp, and remarks. Rejection and return for revision require a reason.' },
        { title: 'Busiest Venue', body: `${busiestVenue?.venue || 'No venue yet'} has the highest activity in the current dataset.` },
      ];
    }

    return [
      { title: 'Workflow Health', body: `${approved} approved, ${rejected} rejected, ${returned} returned, and ${pending} pending/in review records are currently loaded.` },
      { title: 'DSS Administrative Signal', body: `${busiestVenue?.venue || 'No venue yet'} is the busiest venue. Monitor possible conflicts and recurring ministry demand.` },
      { title: 'Compliance Reminder', body: 'Audit trail should record submission, edits, approval, rejection, return for revision, cancellation, and export actions.' },
    ];
  }, [bookings, currentUser, form.date, form.eventType, form.ministry, form.venue]);

  const stats = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'Pending' || b.status === 'In Review').length,
    approved: bookings.filter((b) => b.status === 'Approved').length,
    rejected: bookings.filter((b) => b.status === 'Rejected').length,
    completed: bookings.filter((b) => b.status === 'Completed').length,
  };

  const filteredBookings = bookings.filter((b) => {
    const statusMatch = activeTab === 'All' || b.status === activeTab || (activeTab === 'Pending' && b.status === 'In Review');
    const ministryMatch = filterMinistry === 'All' || b.ministry === filterMinistry;
    const dateMatch = !filterDate || b.date === filterDate;
    const search = `${b.id} ${b.venue} ${b.purpose} ${b.requester} ${b.date} ${b.status} ${b.ministry}`.toLowerCase();
    return statusMatch && ministryMatch && dateMatch && search.includes(searchTerm.toLowerCase());
  });

  const validateDsr = () => {
    const errors = {};
    if (!form.venue) errors.venue = 'Venue is required.';
    if (!form.ministry) errors.ministry = 'Ministry is required.';
    if (!form.eventType) errors.eventType = 'Event type is required.';
    if (!form.purpose.trim()) errors.purpose = 'Purpose is required.';
    if (!form.date) errors.date = 'Event date is required.';
    if (!form.time.trim()) errors.time = 'Time window is required.';
    if (!form.priest) errors.priest = 'Priest/clergy approver is required.';
    if (!form.hasLetter || !form.signedLetterName) errors.hasLetter = 'Upload a signed request letter before submitting the DSR.';

    const selectedVenue = venues.find((v) => v.name === form.venue);
    if (selectedVenue?.chapel && ['Dining Area', 'Preparation Room'].includes(form.eventType)) {
      errors.eventType = 'Dining Area and Preparation Room are not allowed in chapels.';
    }

    if (form.recurrenceType !== 'None' && (Number(form.recurrenceCount) < 2 || Number(form.recurrenceCount) > 12)) {
      errors.recurrenceCount = 'Set 2 to 12 occurrences for recurring requests.';
    }

    const duplicate = bookings.some((b) =>
      b.id !== editingBookingId &&
      b.date === form.date &&
      b.venue === form.venue &&
      b.requester === (currentUser?.name || 'Parish Requester') &&
      b.purpose.trim().toLowerCase() === form.purpose.trim().toLowerCase() &&
      ['Pending', 'In Review', 'Approved'].includes(b.status)
    );
    if (duplicate) errors.duplicate = 'Possible duplicate detected based on requester, venue, date, and purpose.';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getRecurrenceDates = (startDate, recurrenceType, count) => {
    if (!startDate || recurrenceType === 'None' || count < 2) return [startDate];
    const dates = [];
    let current = new Date(`${startDate}T00:00:00`);
    for (let index = 0; index < count; index += 1) {
      if (index > 0) {
        if (recurrenceType === 'Daily') current.setDate(current.getDate() + 1);
        if (recurrenceType === 'Weekly') current.setDate(current.getDate() + 7);
        if (recurrenceType === 'Monthly') current.setMonth(current.getMonth() + 1);
      }
      dates.push(current.toISOString().slice(0, 10));
    }
    return dates;
  };

  const addHistory = (record, status, notes) => ({
    ...record,
    history: [
      { status, user: currentUser?.name || 'System', date: new Date().toLocaleString(), notes },
      ...record.history,
    ],
  });

  const handleStartBookingEdit = () => {
    if (!selectedBooking) return;
    setIsEditingBooking(true);
    setEditingBookingId(selectedBooking.id);
    setForm({
      venue: selectedBooking.venue,
      ministry: selectedBooking.ministry,
      eventType: selectedBooking.eventType,
      purpose: selectedBooking.purpose,
      date: selectedBooking.date,
      time: selectedBooking.time,
      priority: selectedBooking.priority || 'Medium',
      priest: selectedBooking.priest,
      recurrenceType: selectedBooking.recurrenceType || 'None',
      recurrenceCount: selectedBooking.recurrenceCount || 1,
      hasLetter: selectedBooking.hasLetter,
      signedLetterName: selectedBooking.signedLetterName || '',
      signedLetterFile: null,
      signedLetterUrl: selectedBooking.signedLetterUrl || '',
      notes: selectedBooking.remarks || '',
    });
    setIsNewBookingOpen(true);
    setValidationErrors({});
  };

  const handleCreateBooking = (e, saveAsDraft = false) => {
    e?.preventDefault();
    if (!saveAsDraft && !validateDsr()) {
      showToast('Please complete the required DSR fields.', 'error');
      return;
    }

    if (isEditingBooking && editingBookingId) {
      const updatedBookings = bookings.map((b) => {
        if (b.id !== editingBookingId) return b;
        const nextStatus = saveAsDraft ? 'Draft' : (b.status === 'Draft' || b.status === 'Returned' ? 'Pending' : b.status);
        const updatedRecord = {
          ...b,
          venue: form.venue,
          ministry: form.ministry,
          eventType: form.eventType,
          purpose: form.purpose,
          date: form.date,
          time: form.time,
          priority: form.priority,
          priest: form.priest,
          recurrenceType: form.recurrenceType,
          recurrenceCount: form.recurrenceCount,
          hasLetter: form.hasLetter,
          signedLetterName: form.signedLetterName,
          signedLetterUrl: form.signedLetterUrl || b.signedLetterUrl || '',
          signedLetterFile: form.signedLetterFile || b.signedLetterFile || null,
          remarks: form.notes,
          status: nextStatus,
          history: [{
            status: saveAsDraft ? 'Draft Saved' : 'Edited',
            user: currentUser?.name || 'Parish Requester',
            date: new Date().toLocaleString(),
            notes: saveAsDraft ? 'Draft updated.' : 'DSR updated before approval.',
          },
          ...b.history],
        };
        return updatedRecord;
      });
      const nextBooking = updatedBookings.find((b) => b.id === editingBookingId);
      setBookings(updatedBookings);
      setSelectedBooking(nextBooking);
      setIsNewBookingOpen(false);
      setIsEditingBooking(false);
      setEditingBookingId('');
      setForm({
        venue: venues[0].name,
        ministry: MINISTRIES[0],
        eventType: EVENT_TYPES[0],
        purpose: '',
        date: '',
        time: '',
        priority: 'Medium',
        priest: PRIESTS[0],
        recurrenceType: 'None',
        recurrenceCount: 1,
        hasLetter: false,
        signedLetterName: '',
        signedLetterFile: null,
        signedLetterUrl: '',
        notes: '',
      });
      setValidationErrors({});
      showToast(`DSR updated successfully. Reference: ${editingBookingId}`, 'success');
      return;
    }

    const recurrenceDates = getRecurrenceDates(form.date, form.recurrenceType, Number(form.recurrenceCount));
    const seriesId = form.recurrenceType !== 'None' && recurrenceDates.length > 1 ? `RS-${Date.now()}` : '';
    const startIndex = bookings.length;
    const createdRequests = recurrenceDates.map((dateValue, idx) => {
      const id = `DSR-2026-${String(startIndex + idx + 1).padStart(3, '0')}`;
      return {
        id,
        venue: form.venue,
        ministry: form.ministry,
        eventType: form.eventType,
        purpose: form.purpose,
        requester: currentUser?.name || 'Parish Requester',
        requesterEmail: currentUser?.email || 'requester@test.com',
        date: dateValue,
        time: form.time,
        status: saveAsDraft ? 'Draft' : 'Pending',
        priority: form.priority,
        priest: form.priest,
        recurrenceType: form.recurrenceType,
        recurrenceCount: recurrenceDates.length,
        recurrenceIndex: idx + 1,
        seriesId,
        hasLetter: form.hasLetter,
        signedLetterName: form.signedLetterName,
        signedLetterUrl: form.signedLetterUrl || '',
        signedLetterFile: form.signedLetterFile || null,
        submittedAt: new Date().toISOString().split('T')[0],
        approvalTimestamp: '',
        remarks: form.notes,
        history: [
          {
            status: saveAsDraft ? 'Draft Saved' : 'Submitted',
            user: currentUser?.name || 'Parish Requester',
            date: new Date().toLocaleString(),
            notes: saveAsDraft ? 'Saved as draft.' : `DSR submitted. Reference number: ${id}${recurrenceDates.length > 1 ? ` (instance ${idx + 1}/${recurrenceDates.length})` : ''}`,
          },
        ],
      };
    });

    setBookings([...createdRequests, ...bookings]);
    setSelectedBooking(createdRequests[0]);
    setIsNewBookingOpen(false);
    setForm({
      venue: venues[0].name,
      ministry: MINISTRIES[0],
      eventType: EVENT_TYPES[0],
      purpose: '',
      date: '',
      time: '',
      priority: 'Medium',
      priest: PRIESTS[0],
      recurrenceType: 'None',
      recurrenceCount: 1,
      hasLetter: false,
      signedLetterName: '',
      signedLetterFile: null,
      signedLetterUrl: '',
      notes: '',
    });
    setValidationErrors({});
    showToast(`${saveAsDraft ? 'Draft saved' : (createdRequests.length > 1 ? `Recurring DSR series created with ${createdRequests.length} entries. Reference: ${createdRequests[0].id}` : `DSR submitted successfully. Reference: ${createdRequests[0].id}`)}`, saveAsDraft ? 'success' : 'success');
  };

  const handleCreateVenue = (e) => {
    e?.preventDefault();
    const errors = {};
    if (!newVenueForm.name.trim()) errors.name = 'Venue name is required.';
    if (!newVenueForm.capacity || Number.isNaN(Number(newVenueForm.capacity))) errors.capacity = 'Valid capacity is required.';
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      showToast('Please complete the required venue fields.', 'error');
      return;
    }

    if (venues.find((v) => v.name.toLowerCase() === newVenueForm.name.trim().toLowerCase())) {
      showToast('A venue with this name already exists.', 'error');
      return;
    }

    const newV = {
      name: newVenueForm.name.trim(),
      capacity: Number(newVenueForm.capacity),
      status: 'ACTIVE',
      chapel: Boolean(newVenueForm.chapel),
      location: newVenueForm.location.trim(),
      amenities: newVenueForm.amenities.trim(),
      contact: newVenueForm.contact.trim(),
      notes: newVenueForm.notes.trim(),
    };

    setVenues([newV, ...venues]);
    setIsNewVenueOpen(false);
    setNewVenueForm({ name: '', capacity: '', location: '', amenities: '', contact: '', notes: '', chapel: false });
    setValidationErrors({});
    showToast('New venue registered successfully.', 'success');
  };

  const handleUpdateStatus = (id, newStatus) => {
    const remarks = newStatus === 'Approved' ? approvalRemarks : revisionRemarks;
    if (['Rejected', 'Returned'].includes(newStatus) && !remarks.trim()) {
      showToast('Remarks are required for rejection or return for revision.', 'error');
      return;
    }

    const updated = bookings.map((b) => {
      if (b.id !== id) return b;
      const record = {
        ...b,
        status: newStatus,
        approvalTimestamp: newStatus === 'Approved' ? new Date().toLocaleString() : b.approvalTimestamp,
        remarks: remarks || `Marked as ${newStatus}.`,
      };
      return addHistory(record, newStatus, remarks || `${newStatus} by ${currentUser?.name}. Priest/clergy approver: ${b.priest}.`);
    });
    setBookings(updated);
    const next = updated.find((b) => b.id === id);
    setSelectedBooking(next);
    setApprovalRemarks('');
    setRevisionRemarks('');
    showToast(`${id} marked as ${newStatus}.`, newStatus === 'Approved' ? 'success' : 'info');
  };

  const handleCancelRecord = (id) => {
    if (!isAdmin && currentUser?.role !== 'Staff Requester') {
      showToast('Only the requester or administrator can cancel this DSR.', 'error');
      return;
    }
    const updated = bookings.map((b) => b.id === id ? addHistory({ ...b, status: 'Cancelled' }, 'Cancelled', 'Soft cancellation logged for accountability.') : b);
    setBookings(updated);
    setSelectedBooking(updated.find((b) => b.id === id));
    showToast('DSR cancelled with audit log.', 'info');
  };

  const handleAdminDeleteBooking = (id) => {
    if (!isAdmin) {
      showToast('Only administrators can delete requests.', 'error');
      return;
    }
    setBookings((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      if (selectedBooking?.id === id) {
        setSelectedBooking(updated[0] || null);
      }
      return updated;
    });
    showToast('DSR request deleted by administrator.', 'info');
  };

  const handleSendNotification = (e) => {
    e?.preventDefault();
    if (!emailMessage.trim()) {
      showToast('Notification message is required.', 'error');
      return;
    }
    const note = {
      sender: currentUser?.name || 'Administrator',
      recipient: emailRecipient,
      message: emailMessage.trim(),
      date: new Date().toLocaleString(),
      id: `NOTIF-${Date.now()}`,
    };
    setNotifications((prev) => [note, ...prev]);
    setEmailMessage('');
    setEmailRecipient('All Users');
    showToast(`Notification sent to ${note.recipient}.`, 'success');
  };

  const handleAddOrUpdateUser = (e) => {
    e?.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim()) {
      showToast('User name and email are required.', 'error');
      return;
    }
    const existingEmail = users.some((u) => u.email.toLowerCase() === userForm.email.trim().toLowerCase() && u.email !== userEditId);
    if (existingEmail) {
      showToast('A user with this email already exists.', 'error');
      return;
    }
    const prepared = {
      ...userForm,
      email: userForm.email.trim(),
      name: userForm.name.trim(),
      role: userForm.role,
    };
    if (userEditId) {
      setUsers((prev) => prev.map((u) => (u.email === userEditId ? prepared : u)));
      showToast('User account updated.', 'success');
    } else {
      setUsers((prev) => [...prev, prepared]);
      showToast('New user account created.', 'success');
    }
    setUserForm({ name: '', email: '', role: 'Staff Requester', password: 'Password123!', avatar: '👤' });
    setUserEditId('');
    setShowUserModal(false);
  };

  const handleEditUser = (user) => {
    setUserForm({ ...user });
    setUserEditId(user.email);
    setShowUserModal(true);
  };

  const handleDeleteUser = (email) => {
    if (email === currentUser?.email) {
      showToast('You cannot delete the active administrator account.', 'error');
      return;
    }
    setUsers((prev) => prev.filter((u) => u.email !== email));
    showToast('User account removed.', 'info');
  };

  const exportCsv = () => {
    const header = ['Reference', 'Venue', 'Ministry', 'Event Type', 'Date', 'Time', 'Requester', 'Priest Approver', 'Status', 'Remarks'];
    const rows = bookings.map((b) => [b.id, b.venue, b.ministry, b.eventType, b.date, b.time, b.requester, b.priest, b.status, b.remarks || '']);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'san-pedro-dsr-report.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV report exported based on current filters.', 'success');
  };

  const exportPdf = () => {
    showToast('Print dialog opened. Choose Save as PDF to export.', 'info');

    const printContainer = document.createElement('div');
    printContainer.id = 'pdf-print-container';
    printContainer.style.fontFamily = '"Plus Jakarta Sans", sans-serif';
    document.body.appendChild(printContainer);

    document.querySelectorAll('.print-only-section').forEach((section) => {
      printContainer.appendChild(section.cloneNode(true));
    });

    document.body.classList.add('print-export-active');
    window.print();
    document.body.classList.remove('print-export-active');
    document.body.removeChild(printContainer);
  };

  const getFileExtension = (filename) => filename?.split('.').pop()?.toLowerCase() || '';

  const getStatusBadge = (status) => {
    const map = {
      Approved: 'bg-[#00A859]/15 text-[#00A859] border-[#00A859]/20',
      Rejected: 'bg-red-500/15 text-red-500 border-red-500/20',
      Completed: 'bg-blue-500/15 text-blue-500 border-blue-500/20',
      Returned: 'bg-orange-500/15 text-orange-500 border-orange-500/20',
      Cancelled: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20',
      Draft: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
      'In Review': 'bg-purple-500/15 text-purple-400 border-purple-500/20',
      Pending: 'bg-amber-400/15 text-[#B8860B] dark:text-amber-300 border-[#C99700]/20',
    };
    return <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black border ${map[status] || map.Pending}`}>{status}</span>;
  };

  const renderSeal = (large = false) => (
    <div className={`${large ? 'w-32 h-32 sm:w-36 sm:h-36' : 'w-11 h-11'} relative flex items-center justify-center rounded-full bg-gradient-to-tr from-[#0F3B8C] via-[#00A859] to-[#C99700] p-0.5 shadow-lg shadow-blue-950/20`}>
      <svg viewBox="0 0 100 100" className="w-full h-full rounded-full bg-sky-500 p-0.5">
        <circle cx="50" cy="50" r="46" fill="white" stroke="#00A859" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="41" fill="#138496" />
        <circle cx="50" cy="50" r="39" fill="#2E86C1" />
        <path d="M33 67 L67 33 M67 33 Q70 30 74 34 Q78 38 74 41 L67 33" stroke="#C99700" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M67 67 L33 33 M33 33 Q30 30 26 34 Q22 38 26 41 L33 33" stroke="#E5E7EB" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M50 20 L50 72 M38 34 L62 34" stroke="#C99700" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="33" cy="67" r="3" fill="#C0392B" />
        <circle cx="67" cy="67" r="3" fill="#C0392B" />
      </svg>
      <span className={`${large ? 'text-[11px] px-2 py-1 -bottom-2 -right-2' : 'text-[8px] px-1 py-0.5 -bottom-1 -right-1'} absolute bg-[#00A859] text-white font-black rounded-md border border-zinc-900`}>1848</span>
    </div>
  );


  const renderApproverBoard = () => {
    const pendingRequests = bookings.filter((b) => b.status === 'Pending' || b.status === 'In Review');
    const archivedRequests = bookings.filter((b) => ['Approved', 'Rejected', 'Returned', 'Completed'].includes(b.status));
    const activeVenues = venues.filter((v) => v.status === 'ACTIVE');
    const search = searchTerm.trim().toLowerCase();
    const filteredPendingRequests = pendingRequests.filter((b) => {
      const matchesSearch = `${b.id} ${b.venue} ${b.purpose} ${b.requester} ${b.date} ${b.status} ${b.ministry}`.toLowerCase().includes(search);
      const matchesMinistry = filterMinistry === 'All' || b.ministry === filterMinistry;
      const matchesDate = !filterDate || b.date === filterDate;
      return matchesSearch && matchesMinistry && matchesDate;
    });
    const filteredArchivedRequests = archivedRequests.filter((b) => {
      const matchesSearch = `${b.id} ${b.venue} ${b.purpose} ${b.requester} ${b.date} ${b.status} ${b.ministry}`.toLowerCase().includes(search);
      const matchesMinistry = filterMinistry === 'All' || b.ministry === filterMinistry;
      const matchesDate = !filterDate || b.date === filterDate;
      return matchesSearch && matchesMinistry && matchesDate;
    });
    const displayRequests = showApproverArchive ? filteredArchivedRequests : filteredPendingRequests;
    const selected = selectedBooking && displayRequests.some((b) => b.id === selectedBooking.id) ? selectedBooking : displayRequests[0] || null;
    const approvalAuditActions = bookings.flatMap((b) => b.history.map((h) => ({ ...h, id: b.id, venue: b.venue, ministry: b.ministry })));
    const dssNotes = selected
      ? getVenueAdvice(selected.venue, selected.eventType, selected.ministry)
      : ['No request is selected. The DSS will show conflict checks, signed-letter status, and venue rules after a request is opened.'];

    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className={`text-2xl font-black ${textHeadingClass}`}>Pending Approvals</h2>
          <p className={`text-xs ${textMutedClass}`}>Review and approve or reject booking requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className={`border rounded-3xl p-5 ${containerClass}`}>
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setShowApproverArchive(false)} className={`px-3 py-1.5 rounded-full text-[10px] font-black ${showApproverArchive ? (theme === 'dark' ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-slate-100 text-slate-600 border border-slate-200') : 'bg-[#0F3B8C] text-white border border-[#0F3B8C]'}`}>Queue ({pendingRequests.length})</button>
                  <button onClick={() => setShowApproverArchive(true)} className={`px-3 py-1.5 rounded-full text-[10px] font-black ${showApproverArchive ? 'bg-[#0F3B8C] text-white border border-[#0F3B8C]' : (theme === 'dark' ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-slate-100 text-slate-600 border border-slate-200')}`}>Archive ({archivedRequests.length})</button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search approvals, reference, ministry, venue..." className={`w-full border text-xs pl-9 pr-4 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={filterMinistry} onChange={(e) => setFilterMinistry(e.target.value)} className={`border text-xs px-3 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`}>
                      <option>All</option>
                      {MINISTRIES.map((m) => <option key={m}>{m}</option>)}
                    </select>
                    <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className={`border text-xs px-3 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`} />
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl p-4 border mb-4 ${theme === 'dark' ? 'bg-zinc-900/70 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className={`text-sm font-black ${textHeadingClass}`}>Live Venue Catalog</h3>
                    <p className={`text-[11px] ${textMutedClass}`}>Shared source of truth for booking reviews</p>
                  </div>
                  <MapPin className="w-5 h-5 text-[#00A859]" />
                </div>
                <p className="text-2xl font-black mt-3 text-[#00A859]">{activeVenues.length} venues</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {activeVenues.slice(0, 4).map((v) => (
                    <div key={v.name} className={`rounded-xl px-3 py-2 border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950/50' : 'border-slate-200 bg-white'}`}>
                      <p className="text-[10px] font-black truncate">{v.name}</p>
                      <p className="text-[9px] text-zinc-500">{v.capacity} pax</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-black ${textHeadingClass}`}>{showApproverArchive ? 'Archived Requests' : 'Pending Requests'}</h3>
                  <span className="text-[10px] font-black text-[#B8860B] dark:text-[#FFD700]">{displayRequests.length} {showApproverArchive ? 'archived' : 'pending'}</span>
                </div>
                <div className="space-y-2 max-h-[430px] overflow-y-auto pr-1">
                  {displayRequests.length ? displayRequests.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${selected?.id === b.id ? 'border-[#0F3B8C] ring-2 ring-[#0F3B8C]/30' : theme === 'dark' ? 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-mono font-black text-zinc-500">{b.id}</p>
                          <p className={`text-xs font-black truncate ${textHeadingClass}`}>{b.venue}</p>
                          <p className={`text-[11px] truncate mt-1 ${textMutedClass}`}>{b.purpose}</p>
                        </div>
                        {getStatusBadge(b.status)}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] text-zinc-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {b.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.time}</span>
                      </div>
                    </button>
                  )) : (
                    <div className="py-10 text-center text-zinc-500">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#00A859]" />
                      <p className="text-xs font-black">No {showApproverArchive ? 'archived' : 'pending'} requests match your search or filters</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className={`border rounded-3xl p-5 ${containerClass}`}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setApprovalTab('queue')} className={`px-3 py-1.5 rounded-full text-[10px] font-black ${approvalTab === 'queue' ? 'bg-[#0F3B8C] text-white border border-[#0F3B8C]' : theme === 'dark' ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>Queue</button>
                  <button onClick={() => setApprovalTab('audit')} className={`px-3 py-1.5 rounded-full text-[10px] font-black ${approvalTab === 'audit' ? 'bg-[#0F3B8C] text-white border border-[#0F3B8C]' : theme === 'dark' ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>Audit Trail</button>
                </div>
                <span className="text-[10px] text-zinc-500">Showing {approvalTab === 'queue' ? 'request details' : 'approval history'}</span>
              </div>
              {approvalTab === 'queue' ? (
                selected ? (
                  <div className="space-y-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 border-b border-zinc-100 dark:border-zinc-900 pb-4">
                      <div>
                        <p className="text-[10px] font-mono font-black text-zinc-500">{selected.id}</p>
                        <h3 className={`text-xl font-black ${textHeadingClass}`}>{selected.purpose}</h3>
                        <p className={`text-xs mt-1 ${textMutedClass}`}>{selected.venue} • {selected.ministry}</p>
                      </div>
                      {getStatusBadge(selected.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/70 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}><p className="text-[10px] uppercase font-black text-zinc-500">Signed Letter</p><p className={`text-sm font-black mt-1 ${selected.hasLetter ? 'text-[#00A859]' : 'text-red-500'}`}>{selected.hasLetter ? 'Attached' : 'Missing'}</p><p className="text-[10px] text-zinc-500 truncate">{selected.signedLetterName || 'No file uploaded'}</p></div>
                      <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/70 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}><p className="text-[10px] uppercase font-black text-zinc-500">Schedule</p><p className={`text-sm font-black mt-1 ${textHeadingClass}`}>{selected.date}</p><p className="text-[10px] text-zinc-500">{selected.time}</p></div>
                      <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/70 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}><p className="text-[10px] uppercase font-black text-zinc-500">Assigned Priest</p><p className={`text-xs font-black mt-1 ${textHeadingClass}`}>{selected.priest}</p><p className="text-[10px] text-zinc-500">Will appear in approval record</p></div>
                    </div>

                    <div className={`rounded-2xl p-4 border ${theme === 'dark' ? 'bg-[#0F3B8C]/10 border-[#0F3B8C]/30' : 'bg-blue-50 border-blue-100'}`}>
                      <h4 className={`text-xs font-black flex items-center gap-2 ${textHeadingClass}`}><Sparkles className="w-4 h-4 text-[#B8860B]" /> DSR Decision Support</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                        {dssNotes.map((note) => <p key={note} className={`text-[11px] leading-relaxed rounded-xl p-3 ${theme === 'dark' ? 'bg-zinc-950/50 text-zinc-300' : 'bg-white text-slate-600'}`}>• {note}</p>)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Requester</span><p className="font-semibold">{selected.requester}<br /><span className="text-[10px] text-zinc-500">{selected.requesterEmail}</span></p></div>
                      <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Event Type</span><p className="font-semibold">{selected.eventType}</p></div>
                      <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Priority</span><p className="font-semibold">{selected.priority}</p></div>
                      <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Remarks</span><p className="font-semibold">{selected.remarks || 'No remarks yet.'}</p></div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                      <label className="text-[10px] font-black uppercase text-zinc-500">Approval / Rejection Remarks</label>
                      <textarea value={revisionRemarks} onChange={(e) => setRevisionRemarks(e.target.value)} rows={3} placeholder="Required for rejection or return. Optional for approval." className={`w-full border rounded-xl px-3 py-2 text-xs outline-none ${inputClass}`} />
                      <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => handleUpdateStatus(selected.id, 'Approved')} className="py-3 rounded-xl bg-[#00A859] hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1"><CheckCircle className="w-4 h-4" /> Approve</button>
                        <button onClick={() => handleUpdateStatus(selected.id, 'Returned')} className="py-3 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 text-orange-500 border border-orange-500/20 font-bold text-xs">Return</button>
                        <button onClick={() => handleUpdateStatus(selected.id, 'Rejected')} className="py-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-500 border border-red-500/20 font-bold text-xs flex items-center justify-center gap-1"><XCircle className="w-4 h-4" /> Reject</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center text-zinc-500">
                    <FileText className="w-10 h-10 mx-auto mb-3" />
                    <h3 className={`text-lg font-black ${textHeadingClass}`}>Select a request</h3>
                    <p className="text-xs mt-1">Click on a request to view details</p>
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className={`text-lg font-black ${textHeadingClass}`}>Audit Trail</h3>
                      <p className={`text-xs ${textMutedClass}`}>Review approval history, timestamps, and user actions.</p>
                    </div>
                    <div className="rounded-full bg-slate-100 dark:bg-zinc-900 px-3 py-1 text-[11px] font-bold text-slate-600 dark:text-zinc-300">{approvalAuditActions.length} actions</div>
                  </div>
                  <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-zinc-800 bg-transparent">
                    <table className="w-full text-xs">
                      <thead className="text-[10px] uppercase text-zinc-500 bg-slate-50 dark:bg-zinc-950">
                        <tr>
                          <th className="text-left py-3 px-3">Timestamp</th>
                          <th className="text-left py-3 px-3">User</th>
                          <th className="text-left py-3 px-3">Action</th>
                          <th className="text-left py-3 px-3">Reference</th>
                          <th className="text-left py-3 px-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
                        {approvalAuditActions.map((entry, index) => (
                          <tr key={`${entry.id}-${index}`}>
                            <td className="py-3 px-3 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">{entry.date}</td>
                            <td className="py-3 px-3">{entry.user}</td>
                            <td className="py-3 px-3">{entry.status}</td>
                            <td className="py-3 px-3 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">{entry.id}</td>
                            <td className="py-3 px-3 text-[11px] text-zinc-500 dark:text-zinc-400">{entry.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDssPanel = () => (
    <div className={`border rounded-3xl p-5 ${containerClass}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className={`text-sm font-black flex items-center gap-2 ${textHeadingClass}`}><Sparkles className="w-4 h-4 text-[#B8860B] dark:text-[#FFD700]" /> {t('dssTitle')}</h3>
          <p className={`text-[11px] ${textMutedClass}`}>{t('dssSub')}</p>
        </div>
        <span className="text-[9px] uppercase font-black text-[#00A859] border border-[#00A859]/20 rounded-full px-2 py-1">Smart DSR Guidance</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {roleDssCards.map((card) => (
          <div key={card.title} className={`rounded-2xl p-4 border ${theme === 'dark' ? 'bg-zinc-900/70 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
            <p className="text-[10px] uppercase font-black text-[#B8860B] dark:text-[#FFD700] mb-2">{card.title}</p>
            <p className={`text-[11px] leading-relaxed ${textMutedClass}`}>{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExploreFacilitiesPage = () => (
    <div className="space-y-8 animate-fade-in">
      <div className={`rounded-[36px] border p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950/90' : 'border-slate-200 bg-white/95'}`}>
        <div className="absolute inset-0 overflow-hidden rounded-[36px] pointer-events-none">
          <div className={`absolute -top-14 left-10 h-28 w-28 rounded-full blur-3xl opacity-40 ${theme === 'dark' ? 'bg-[#0F3B8C]' : 'bg-[#BFDBFE]'}`} />
          <div className={`absolute bottom-0 right-0 h-36 w-36 rounded-full blur-3xl opacity-30 ${theme === 'dark' ? 'bg-[#00A859]' : 'bg-emerald-200'}`} />
        </div>

        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-[10px] uppercase tracking-[0.35em] font-black text-[#0F3B8C] dark:text-[#7DD3FC]">Explore Facilities</p>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-tight ${textHeadingClass}`}>A polished public guide for venue use, readiness, and booking confidence.</h2>
              <p className={`text-sm leading-relaxed max-w-2xl ${textMutedClass}`}>This page is designed to feel welcoming and clear for guests and requesters, with a brighter layout, smoother motion, and clearer action paths before anyone signs in.</p>
            </div>
            <div className={`rounded-3xl border px-4 py-3 text-xs font-black uppercase tracking-[0.25em] ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/80 text-zinc-200' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
              Public reference view
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { title: 'Venue readiness', body: 'See capacity, availability windows, and the types of parish events supported by each facility.', icon: Building2, accent: 'text-[#0F3B8C] dark:text-sky-300' },
              { title: 'Booking flow', body: 'Learn the process for submitting a DSR, assigning an approver, and receiving a decision.', icon: Calendar, accent: 'text-[#00A859] dark:text-emerald-300' },
              { title: 'Public only', body: 'No protected actions appear here until a user signs in, keeping the experience safe and easy to browse.', icon: ShieldCheck, accent: 'text-[#B8860B] dark:text-amber-300' },
            ].map((item, index) => (
              <article key={item.title} className={`group rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/80' : 'border-slate-200 bg-slate-50/90'}`} style={{ animationDelay: `${index * 80}ms` }}>
                <div className="flex items-start justify-between gap-3">
                  <item.icon className={`w-5 h-5 ${item.accent}`} />
                  <span className={`rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[0.24em] ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-white text-slate-500'}`}>Guide {index + 1}</span>
                </div>
                <h3 className={`mt-4 text-sm font-black ${textHeadingClass}`}>{item.title}</h3>
                <p className={`mt-2 text-[13px] leading-relaxed ${textMutedClass}`}>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <article className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${theme === 'dark' ? 'border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900' : 'border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100'}`}>
              <div className="mb-4 flex items-center gap-2 text-[#0F3B8C] dark:text-sky-300">
                <BadgeCheck className="w-4 h-4" />
                <h3 className="text-sm font-black">Top guidance</h3>
              </div>
              <ul className="space-y-3 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                <li className="rounded-2xl border border-transparent p-3 transition hover:border-[#00A859]/30 hover:bg-emerald-500/5">• Confirm your event type and expected attendance before requesting a venue.</li>
                <li className="rounded-2xl border border-transparent p-3 transition hover:border-[#00A859]/30 hover:bg-emerald-500/5">• Check approved schedules early and avoid heavily booked dates.</li>
                <li className="rounded-2xl border border-transparent p-3 transition hover:border-[#00A859]/30 hover:bg-emerald-500/5">• Prepare the signed letter and event summary to keep your request smooth.</li>
              </ul>
            </article>

            <article className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${theme === 'dark' ? 'border-zinc-800 bg-gradient-to-br from-[#0F3B8C]/10 via-zinc-950 to-[#00A859]/10' : 'border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50'}`}>
              <div className="mb-4 flex items-center gap-2 text-[#0F3B8C] dark:text-sky-300">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-sm font-black">Ready to sign in?</h3>
              </div>
              <p className={`text-[13px] leading-relaxed ${textMutedClass}`}>If you already have an account, use the button below to enter the booking portal. Otherwise, review the guidance first and then sign in when ready.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={() => { setPublicView('home'); showToast('Returned to landing page.', 'info'); }} className={`px-5 py-3 rounded-xl border text-sm font-bold transition-all hover:-translate-y-0.5 ${theme === 'dark' ? 'border-zinc-700 bg-zinc-950 text-zinc-100 hover:bg-zinc-900' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>Back to Home</button>
                <button onClick={() => { setShowLoginModal(true); setValidationErrors({}); }} className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F3B8C] text-sm font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-[#0d3a79]">Sign in to Request <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" /></button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => {
    const pendingRequests = bookings.filter((b) => ['Pending', 'In Review'].includes(b.status));
    return (
      <div className="space-y-6 animate-fade-in">
        {renderDssPanel()}

        <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.9fr] gap-5">
          <div className={`border rounded-3xl p-5 ${containerClass}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h3 className={`text-sm font-black ${textHeadingClass}`}>Admin Statistics</h3>
                <p className={`text-[11px] ${textMutedClass}`}>Approval workload, request trends, and venue demand for the portal.</p>
              </div>
              <button onClick={() => showToast('Admin dashboard refreshed.', 'info')} className="animate-soft-pop px-4 py-2 rounded-xl bg-[#0F3B8C] text-white text-[10px] font-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1D4ED8] active:scale-95">Refresh</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              <div className={`p-4 rounded-2xl ${containerClass}`}><p className="text-[10px] uppercase font-bold text-zinc-500">Total Requests</p><h3 className="text-2xl font-black">{bookings.length}</h3></div>
              <div className={`p-4 rounded-2xl ${containerClass}`}><p className="text-[10px] uppercase font-bold text-zinc-500">Pending Approvals</p><h3 className="text-2xl font-black">{pendingRequests.length}</h3></div>
              <div className={`p-4 rounded-2xl ${containerClass}`}><p className="text-[10px] uppercase font-bold text-zinc-500">Approved</p><h3 className="text-2xl font-black">{bookings.filter((b) => b.status === 'Approved').length}</h3></div>
              <div className={`p-4 rounded-2xl ${containerClass}`}><p className="text-[10px] uppercase font-bold text-zinc-500">Rejected</p><h3 className="text-2xl font-black">{bookings.filter((b) => b.status === 'Rejected').length}</h3></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase text-zinc-500 mb-4">Status Distribution</p>
                {[['Pending', pendingRequests.length], ['Approved', bookings.filter((b) => b.status === 'Approved').length], ['Rejected', bookings.filter((b) => b.status === 'Rejected').length], ['Returned', bookings.filter((b) => b.status === 'Returned').length]].map(([label, value]) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-[10px] font-bold mb-1"><span>{label}</span><span>{value}</span></div>
                    <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div className="h-full rounded-full bg-[#00A859]" style={{ width: `${Math.max(8, (value / Math.max(1, bookings.length)) * 100)}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase text-zinc-500 mb-4">Venue Demand</p>
                {venues.slice(0, 5).map((v) => {
                  const count = bookings.filter((b) => b.venue === v.name).length;
                  return (
                    <div key={v.name} className="grid grid-cols-[1fr_auto] gap-3 items-center mb-3">
                      <div>
                        <p className="text-[10px] font-bold truncate">{v.name}</p>
                        <div className="h-2 mt-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div className="h-full rounded-full bg-[#0F3B8C]" style={{ width: `${Math.max(6, (count / Math.max(1, bookings.length)) * 100)}%` }} /></div>
                      </div>
                      <span className="text-[10px] font-black">{count}</span>
                    </div>
                  );
                })}
              </div>
              <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase text-zinc-500 mb-4">System Snapshot</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#00A859]/10"><p className="text-[9px] uppercase font-black text-[#00A859]">Approval Rate</p><p className="text-xl font-black">{Math.round((bookings.filter((b) => b.status === 'Approved').length / Math.max(1, bookings.length)) * 100)}%</p></div>
                  <div className="p-3 rounded-xl bg-[#0F3B8C]/10"><p className="text-[9px] uppercase font-black text-[#0F3B8C] dark:text-blue-300">Venues</p><p className="text-xl font-black">{venues.length}</p></div>
                  <div className="p-3 rounded-xl bg-[#C99700]/10"><p className="text-[9px] uppercase font-black text-[#8A6500] dark:text-amber-300">Ministries</p><p className="text-xl font-black">{MINISTRIES.length}</p></div>
                  <div className="p-3 rounded-xl bg-red-500/10"><p className="text-[9px] uppercase font-black text-red-500">Conflicts</p><p className="text-xl font-black">0</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`border rounded-3xl p-5 ${containerClass}`}>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h3 className={`text-sm font-black ${textHeadingClass}`}>Pending Approval Queue</h3>
                <p className={`text-[11px] ${textMutedClass}`}>Review the next DSRs waiting for assignment or decision.</p>
              </div>
              <button onClick={() => setActivePage('approvals')} className="animate-soft-pop px-4 py-2 rounded-xl bg-[#0F3B8C] text-white text-[10px] font-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1D4ED8] active:scale-95">Open Full Queue</button>
            </div>
            {pendingRequests.length === 0 ? (
              <p className={`text-[10px] ${textMutedClass}`}>No pending approvals are waiting right now.</p>
            ) : (
              <div className="space-y-3">
                {pendingRequests.slice(0, 4).map((b) => (
                  <div key={b.id} className={`rounded-2xl border p-4 ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950/60' : 'border-slate-200 bg-slate-50'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-zinc-500">{b.id}</p>
                        <h4 className={`text-sm font-black truncate ${textHeadingClass}`}>{b.venue}</h4>
                        <p className={`text-[10px] ${textMutedClass}`}>{b.ministry} • {b.date} • {b.time}</p>
                      </div>
                      <button onClick={() => { setSelectedBooking(b); setActivePage('approvals'); }} className="animate-soft-pop px-3 py-2 rounded-xl bg-[#00A859] text-white text-[10px] font-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600 active:scale-95">Review</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    if (isAdmin) return renderAdminDashboard();
    if (isApprover) return renderApproverBoard();
    return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-black tracking-tight ${textHeadingClass}`}>DSR Workflow Automation Board</h2>
          <p className={`text-xs ${textMutedClass}`}>Dashboard summary, DSR records, workflow status, and live parish DSS guidance.</p>
        </div>
        <button onClick={() => setIsNewBookingOpen(true)} className="px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 bg-[#00A859] text-white hover:bg-emerald-600 shadow-md">
          <Plus className="w-4 h-4" /> {t('requestVenueBtn')}
        </button>
      </div>

      {renderDssPanel()}

      {!isAdmin && !isApprover && (
        <div className={`border rounded-3xl p-5 ${containerClass}`}>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h3 className={`text-lg font-black ${textHeadingClass}`}>My Request Center</h3>
              <p className={`text-xs ${textMutedClass}`}>Made simpler for requesters: start with a new DSR, check your status, or view available schedules.</p>
            </div>
            <button onClick={() => setIsNewVenueOpen(true)} className="px-5 py-3 rounded-2xl bg-[#0F3B8C] text-white text-xs font-black flex items-center gap-2 shadow-md"><Plus className="w-4 h-4" /> Start New Venue Request</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {[
              ['1', 'Upload signed letter', 'Prepare the approved letter before submitting.'],
              ['2', 'Choose venue and priest', 'Select the facility, ministry, event type, and clergy approver.'],
              ['3', 'Track status', 'Follow Pending, In Review, Approved, Returned, or Rejected labels.'],
            ].map(([n, title, body]) => (
              <div key={n} className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/70 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="w-8 h-8 rounded-full bg-[#00A859] text-white flex items-center justify-center text-xs font-black mb-3">{n}</div>
                <p className={`text-xs font-black ${textHeadingClass}`}>{title}</p>
                <p className={`text-[11px] mt-1 ${textMutedClass}`}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isNewVenueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <div className="bg-[#121214] rounded-3xl border border-zinc-800 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[92vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0F3B8C] to-[#00A859] text-white p-5 flex justify-between items-center border-b border-zinc-800">
              <div><h3 className="text-xs font-black tracking-widest uppercase flex items-center gap-2"><Plus className="w-4 h-4 text-amber-400" /> New Venue Registration</h3><p className="text-[10px] text-zinc-200">Request to add a new venue to the system for admin review and activation.</p></div>
              <button onClick={() => setIsNewVenueOpen(false)} className="text-zinc-200 hover:text-white p-1 rounded-full hover:bg-zinc-900"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateVenue} className="p-6 space-y-4 text-left">
              <div className="p-4 rounded-2xl border bg-zinc-900 border-zinc-800">
                <Field label="Venue Name" error={validationErrors.name}><input value={newVenueForm.name} onChange={(e) => setNewVenueForm({ ...newVenueForm, name: e.target.value })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none" /></Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <Field label="Capacity" error={validationErrors.capacity}><input value={newVenueForm.capacity} onChange={(e) => setNewVenueForm({ ...newVenueForm, capacity: e.target.value })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none" /></Field>
                  <Field label="Location"><input value={newVenueForm.location} onChange={(e) => setNewVenueForm({ ...newVenueForm, location: e.target.value })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none" /></Field>
                </div>
                <Field label="Amenities"><input value={newVenueForm.amenities} onChange={(e) => setNewVenueForm({ ...newVenueForm, amenities: e.target.value })} placeholder="e.g., sound system, projector" className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none" /></Field>
                <Field label="Contact Person"><input value={newVenueForm.contact} onChange={(e) => setNewVenueForm({ ...newVenueForm, contact: e.target.value })} placeholder="Name / email / phone" className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none" /></Field>
                <div className="flex items-center gap-3 mt-2"><input id="chapel" type="checkbox" checked={newVenueForm.chapel} onChange={(e) => setNewVenueForm({ ...newVenueForm, chapel: e.target.checked })} className="w-4 h-4" /><label htmlFor="chapel" className="text-[10px]">Is this a chapel?</label></div>
                <Field label="Notes / Justification"><textarea value={newVenueForm.notes} onChange={(e) => setNewVenueForm({ ...newVenueForm, notes: e.target.value })} rows={3} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 placeholder:text-zinc-650 outline-none" /></Field>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-zinc-900">
                <button type="button" onClick={() => setIsNewVenueOpen(false)} className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-100">Submit Venue Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          ['All', t('totalDSRs'), stats.all, 'text-[#00A859]'],
          ['Pending', t('pending'), stats.pending, 'text-[#B8860B] dark:text-amber-300'],
          ['Approved', t('approved'), stats.approved, 'text-[#00A859]'],
          ['Rejected', t('rejected'), stats.rejected, 'text-red-500'],
          ['Completed', t('completed'), stats.completed, 'text-blue-500'],
        ].map(([tab, label, value, color]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left p-4 rounded-2xl border transition-all ${containerClass} ${activeTab === tab ? 'ring-2 ring-[#0F3B8C]/50 border-[#0F3B8C]' : ''}`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${textMutedClass}`}>{label}</span>
            <h3 className={`mt-2 text-2xl font-black ${color}`}>{value}</h3>
          </button>
        ))}
      </div>

      {isAdmin && activePage === 'dashboard' && (
        <div className={`border rounded-3xl p-5 ${containerClass}`}>
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <h3 className={`text-sm font-black ${textHeadingClass}`}>Administrative Statistics Diagrams</h3>
              <p className={`text-[11px] ${textMutedClass}`}>A faster visual summary for request volume, workflow health, and venue demand.</p>
            </div>
            <span className="text-[9px] font-black uppercase px-2 py-1 rounded-full bg-[#0F3B8C]/10 text-[#0F3B8C] dark:text-blue-300">Live DSR Analytics</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-[10px] font-black uppercase text-zinc-500 mb-4">Status Distribution</p>
              {[['Pending', stats.pending], ['Approved', stats.approved], ['Rejected', stats.rejected], ['Returned', stats.returned]].map(([label, value]) => (
                <div key={label} className="mb-3">
                  <div className="flex justify-between text-[10px] font-bold mb-1"><span>{label}</span><span>{value}</span></div>
                  <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div className="h-full rounded-full bg-[#00A859]" style={{ width: `${Math.max(8, (value / Math.max(1, stats.all)) * 100)}%` }} /></div>
                </div>
              ))}
            </div>
            <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-[10px] font-black uppercase text-zinc-500 mb-4">Venue Demand</p>
                {venues.slice(0, 5).map((v) => {
                const count = bookings.filter((b) => b.venue === v.name).length;
                return (
                  <div key={v.name} className="grid grid-cols-[1fr_auto] gap-3 items-center mb-3">
                    <div><p className="text-[10px] font-bold truncate">{v.name}</p><div className="h-2 mt-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"><div className="h-full rounded-full bg-[#0F3B8C]" style={{ width: `${Math.max(6, (count / Math.max(1, bookings.length)) * 100)}%` }} /></div></div>
                    <span className="text-[10px] font-black">{count}</span>
                  </div>
                );
              })}
            </div>
            <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-[10px] font-black uppercase text-zinc-500 mb-4">System Snapshot</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#00A859]/10"><p className="text-[9px] uppercase font-black text-[#00A859]">Approval Rate</p><p className="text-xl font-black">{Math.round((stats.approved / Math.max(1, stats.all)) * 100)}%</p></div>
                <div className="p-3 rounded-xl bg-[#0F3B8C]/10"><p className="text-[9px] uppercase font-black text-[#0F3B8C] dark:text-blue-300">Venues</p><p className="text-xl font-black">{venues.length}</p></div>
                <div className="p-3 rounded-xl bg-[#C99700]/10"><p className="text-[9px] uppercase font-black text-[#8A6500] dark:text-amber-300">Ministries</p><p className="text-xl font-black">{MINISTRIES.length}</p></div>
                <div className="p-3 rounded-xl bg-red-500/10"><p className="text-[9px] uppercase font-black text-red-500">Conflicts</p><p className="text-xl font-black">0</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className={`lg:col-span-7 border rounded-3xl p-5 space-y-4 ${containerClass}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('searchPlaceholder')} className={`w-full border text-xs pl-9 pr-4 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`} />
            </div>
            <select value={filterMinistry} onChange={(e) => setFilterMinistry(e.target.value)} className={`border text-xs px-3 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`}>
              <option>All</option>
              {MINISTRIES.map((m) => <option key={m}>{m}</option>)}
            </select>
            <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className={`border text-xs px-3 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`} />
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Pending', 'In Review', 'Approved', 'Rejected', 'Returned', 'Completed'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-full text-[10px] font-black border ${activeTab === tab ? 'bg-[#0F3B8C] text-white border-[#0F3B8C]' : theme === 'dark' ? 'border-zinc-800 text-zinc-400' : 'border-slate-200 text-slate-500'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-900 max-h-[530px] overflow-y-auto pr-1">
            {filteredBookings.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 space-y-2">
                <div className="text-3xl">🗂️</div>
                <h4 className="text-xs font-bold">No DSR records found</h4>
                <p className="text-[10px] max-w-[260px] mx-auto">Try changing the search, status, date, or ministry filter.</p>
              </div>
            ) : filteredBookings.map((b) => (
              <div key={b.id} onClick={() => setSelectedBooking(b)} className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-start justify-between gap-4 border ${selectedBooking?.id === b.id ? theme === 'dark' ? 'bg-zinc-900 border-zinc-750 shadow-md' : 'bg-slate-50 border-slate-300 shadow-sm' : 'border-transparent hover:bg-zinc-100/45 dark:hover:bg-zinc-900/40'}`}>
                <div className="space-y-1.5 min-w-0">
                  <span className="text-[9px] font-mono font-bold text-zinc-500">{b.id}</span>
                  <h4 className={`text-xs font-extrabold truncate ${textHeadingClass}`}>{b.venue}</h4>
                  <p className={`text-[11px] truncate ${textMutedClass}`}>{b.purpose}</p>
                  <p className="text-[10px] text-zinc-500">{b.ministry} • {b.date} • {b.time}</p>
                </div>
                <div className="shrink-0 text-right">{getStatusBadge(b.status)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-5 border rounded-3xl p-5 space-y-4 ${containerClass}`}>
          {selectedBooking ? (
            <div className="space-y-5">
              <div className="pb-3 border-b border-zinc-150 dark:border-zinc-900">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[9px] font-mono text-zinc-500 font-bold">{selectedBooking.id}</span>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <h3 className={`text-sm font-black mt-2 leading-snug ${textHeadingClass}`}>{selectedBooking.purpose}</h3>
                <p className={`text-[11px] mt-1 ${textMutedClass}`}>{selectedBooking.venue} • {selectedBooking.ministry}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Date & Time</span><p className="font-semibold">{selectedBooking.date}<br />{selectedBooking.time}</p></div>
                <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Requester</span><p className="font-semibold">{selectedBooking.requester}<br /><span className="text-[10px] text-zinc-500">{selectedBooking.requesterEmail}</span></p></div>
                <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Event Type</span><p className="font-semibold">{selectedBooking.eventType}</p></div>
                <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Priest Approver</span><p className="font-semibold">{selectedBooking.priest}</p></div>
                {selectedBooking.recurrenceType && selectedBooking.recurrenceType !== 'None' && (
                  <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Recurrence</span><p className="font-semibold">{selectedBooking.recurrenceType} ({selectedBooking.recurrenceIndex}/{selectedBooking.recurrenceCount})</p></div>
                )}
                <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Signed Letter</span><p className={`font-black ${selectedBooking.hasLetter ? 'text-[#00A859]' : 'text-red-500'}`}>{selectedBooking.hasLetter ? `Attached: ${selectedBooking.signedLetterName || 'Signed letter'}` : 'Missing'}</p></div>
                <div><span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Remarks</span><p className="font-semibold">{selectedBooking.remarks || 'No remarks yet.'}</p></div>
              </div>

              {selectedBooking.signedLetterUrl ? (
                <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950/80">
                  {['jpg', 'jpeg', 'png'].includes(selectedBooking.signedLetterName?.split('.').pop()?.toLowerCase()) ? (
                    <img src={selectedBooking.signedLetterUrl} alt="Signed letter preview" className="w-full max-h-[260px] object-contain bg-zinc-950" />
                  ) : selectedBooking.signedLetterName?.split('.').pop()?.toLowerCase() === 'pdf' ? (
                    <embed src={selectedBooking.signedLetterUrl} type="application/pdf" className="w-full min-h-[260px]" />
                  ) : (
                    <div className="p-4 text-[10px] text-zinc-300">Preview is available only for PDF or image attachments.</div>
                  )}
                  <div className="p-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2 bg-zinc-950/90">
                    <span className="text-[10px] text-zinc-400">Preview and download the attached request letter.</span>
                    <a href={selectedBooking.signedLetterUrl} download={selectedBooking.signedLetterName} className="text-[10px] font-bold text-[#00A859] hover:underline flex items-center gap-1"><Download className="w-3 h-3" /> Download letter</a>
                  </div>
                </div>
              ) : selectedBooking.signedLetterName ? (
                <div className="rounded-3xl border border-zinc-800 p-3 text-[10px] text-zinc-400 bg-zinc-950/50">Attachment stored: {selectedBooking.signedLetterName}. Preview unavailable for historic attachments.</div>
              ) : null}

              <div className={`p-3.5 rounded-xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] uppercase font-black text-[#B8860B] dark:text-[#FFD700] mb-1">DSS Review</p>
                <ul className={`text-[10px] leading-relaxed space-y-1 ${textMutedClass}`}>
                  <li>• {getMonthAdvice(selectedBooking.date)}</li>
                  {getVenueAdvice(selectedBooking.venue, selectedBooking.eventType, selectedBooking.ministry).map((a) => <li key={a}>• {a}</li>)}
                </ul>
              </div>

              {selectedBooking.status === 'Pending' && canDecide ? (
                <div className="pt-4 border-t border-zinc-150 dark:border-zinc-900 space-y-3">
                  <span className="text-[10px] font-bold text-[#B8860B] dark:text-amber-300 dark:text-[#B8860B] dark:text-[#FFD700] uppercase block">Clergy / Approver Decision</span>
                  <textarea value={approvalRemarks} onChange={(e) => setApprovalRemarks(e.target.value)} rows={2} placeholder="Approval remarks..." className={`w-full border rounded-xl px-3 py-2 text-xs outline-none ${inputClass}`} />
                  <textarea value={revisionRemarks} onChange={(e) => setRevisionRemarks(e.target.value)} rows={2} placeholder="Required remarks for rejection or return for revision..." className={`w-full border rounded-xl px-3 py-2 text-xs outline-none ${inputClass}`} />
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleUpdateStatus(selectedBooking.id, 'Approved')} className="py-2.5 rounded-xl bg-[#00A859] hover:bg-emerald-600 text-white font-bold text-xs">Approve</button>
                    <button onClick={() => handleUpdateStatus(selectedBooking.id, 'Returned')} className="py-2.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 text-orange-500 border border-orange-500/20 font-bold text-xs">Return</button>
                    <button onClick={() => handleUpdateStatus(selectedBooking.id, 'Rejected')} className="py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-500 border border-red-500/20 font-bold text-xs">Reject</button>
                  </div>
                </div>
              ) : selectedBooking.status === 'Pending' ? (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10px] text-[#B8860B] dark:text-amber-300 dark:text-amber-300 leading-relaxed flex gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{t('actionsRestricted')}</span>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                <button onClick={() => window.print()} className="px-3 py-2 rounded-xl border border-zinc-800 text-[10px] font-bold flex items-center gap-1"><Printer className="w-3 h-3" /> Printable View</button>
                {((selectedBooking.status === 'Pending' || selectedBooking.status === 'Returned' || selectedBooking.status === 'Draft') || isAdmin) && <button onClick={handleStartBookingEdit} className="px-3 py-2 rounded-xl border border-zinc-800 text-[10px] font-bold flex items-center gap-1"><Edit3 className="w-3 h-3" /> Edit Request</button>}
                <button onClick={() => handleCancelRecord(selectedBooking.id)} className="px-3 py-2 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-bold flex items-center gap-1"><Trash2 className="w-3 h-3" /> Cancel / Soft Delete</button>
                {isAdmin && <button onClick={() => handleAdminDeleteBooking(selectedBooking.id)} className="px-3 py-2 rounded-xl border border-red-500 bg-red-500/10 text-red-500 text-[10px] font-bold flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete Request</button>}
              </div>

              <div className="pt-4 border-t border-zinc-150 dark:border-zinc-900 space-y-2">
                <span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Audit Trail</span>
                <div className="space-y-3 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-200 dark:before:bg-zinc-900">
                  {selectedBooking.history.map((hist, idx) => (
                    <div key={`${hist.status}-${idx}`} className="flex gap-2 text-[11px] relative">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 z-10 text-[8px] font-bold ${hist.status === 'Approved' ? 'bg-[#00A859] border-[#00A859] text-white' : hist.status === 'Rejected' ? 'bg-red-500 border-red-500 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-300'}`}>{idx + 1}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-baseline gap-2"><span className={`font-bold ${textHeadingClass}`}>{hist.status}</span><span className="text-[9px] text-zinc-500">{hist.date}</span></div>
                        <p className="text-[10px] text-zinc-500">By: {hist.user}</p>
                        <p className="text-[10px] text-zinc-400 italic mt-0.5">"{hist.notes}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : <div className="py-12 text-center text-zinc-500">Select a DSR record to view details.</div>}
        </div>
      </div>
    </div>
  );
  };

  const renderReports = () => {
    const actionEntries = bookings.flatMap((b) => b.history.map((h) => ({ ...h, id: b.id, venue: b.venue, ministry: b.ministry })));
    const actions = [
      ...actionEntries,
      ...notifications.map((n) => ({ status: 'Notification', user: n.sender, date: n.date, id: n.id, venue: '', ministry: '', notes: `${n.recipient}: ${n.message}` })),
    ];
    const filteredActions = actions.filter((a) => {
      const search = reportSearch.trim().toLowerCase();
      const matchesSearch = !search || `${a.user} ${a.status} ${a.id} ${a.venue} ${a.ministry} ${a.notes}`.toLowerCase().includes(search);
      const matchesStatus = reportStatusFilter === 'All' || a.status === reportStatusFilter;
      const matchesDate = !reportDate || a.date.startsWith(reportDate);
      return matchesSearch && matchesStatus && matchesDate;
    });

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h2 className={`text-2xl font-black ${textHeadingClass}`}>{t('auditReports')}</h2>
            <p className={`text-xs ${textMutedClass}`}>Filter activities, review accountability logs, and export the current DSR dataset.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportCsv} className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#0F3B8C] text-white flex items-center gap-2"><Download className="w-4 h-4" /> Export CSV</button>
            <button onClick={exportPdf} className="px-4 py-2.5 rounded-xl font-bold text-xs bg-zinc-800 text-white flex items-center gap-2"><Printer className="w-4 h-4" /> Export PDF</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <input value={reportSearch} onChange={(e) => setReportSearch(e.target.value)} placeholder="Search user, action, reference, venue, notes..." className={`w-full border text-xs pl-9 pr-3 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`} />
            </div>
            <select value={reportStatusFilter} onChange={(e) => setReportStatusFilter(e.target.value)} className={`border text-xs px-3 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`}>
              <option>All</option>
              {['Submitted', 'Approved', 'Rejected', 'Returned', 'Cancelled', 'Notification', 'In Review', 'Completed'].map((status) => <option key={status}>{status}</option>)}
            </select>
            <input type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} className={`border text-xs px-3 py-2.5 rounded-xl outline-none font-semibold ${inputClass}`} />
          </div>
          <button onClick={() => { setReportSearch(''); setReportStatusFilter('All'); setReportDate(''); }} className="self-end px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold">Clear Filters</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-2xl ${containerClass}`}><p className="text-[10px] uppercase font-bold text-zinc-500">Total Actions Logged</p><h3 className="text-2xl font-black">{filteredActions.length}</h3></div>
          <div className={`p-4 rounded-2xl ${containerClass}`}><p className="text-[10px] uppercase font-bold text-zinc-500">Requests Submitted</p><h3 className="text-2xl font-black">{bookings.length}</h3></div>
          <div className={`p-4 rounded-2xl ${containerClass}`}><p className="text-[10px] uppercase font-bold text-zinc-500">Active Venues</p><h3 className="text-2xl font-black">{venues.length}</h3></div>
          <div className={`p-4 rounded-2xl ${containerClass}`}><p className="text-[10px] uppercase font-bold text-zinc-500">System Status</p><h3 className="text-2xl font-black">Live</h3></div>
        </div>

        <div className={`border rounded-3xl p-5 ${containerClass} print-only-section`}>
          <h3 className={`text-sm font-black mb-4 ${textHeadingClass}`}>Activity Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-[10px] uppercase text-zinc-500">
                <tr><th className="text-left py-2">Timestamp</th><th className="text-left py-2">User</th><th className="text-left py-2">Action</th><th className="text-left py-2">Reference</th><th className="text-left py-2">Details</th></tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {filteredActions.map((a, i) => <tr key={i}><td className="py-2">{a.date}</td><td>{a.user}</td><td>{a.status}</td><td className="font-mono">{a.id}</td><td>{a.notes}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`border rounded-3xl p-5 ${containerClass} print-only-section`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h3 className={`text-sm font-black ${textHeadingClass}`}>User Management</h3>
              <p className={`text-xs ${textMutedClass}`}>Create, edit, and remove admin and staff accounts for portal access.</p>
            </div>
            <button onClick={() => { setUserForm({ name: '', email: '', role: 'Staff Requester', password: 'Password123!', avatar: '👤' }); setUserEditId(''); setShowUserModal(true); }} className="px-4 py-2 rounded-xl bg-[#0F3B8C] text-white text-xs font-black">New User</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-[10px] uppercase text-zinc-500">
                <tr><th className="text-left py-2">Name</th><th className="text-left py-2">Email</th><th className="text-left py-2">Role</th><th className="text-left py-2">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="py-2">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="py-2 space-x-2">
                      <button onClick={() => handleEditUser(user)} className="px-3 py-1 rounded-full bg-[#0F3B8C] text-white text-[10px] font-black">Edit</button>
                      <button onClick={() => handleDeleteUser(user.email)} className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-sm">
            <div className={`animate-soft-pop w-full max-w-2xl rounded-3xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'} shadow-2xl`}>
              <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-slate-200'}`}>
                <div>
                  <h3 className="text-lg font-black">{userEditId ? 'Edit User' : 'Create New User'}</h3>
                  <p className="text-[11px] text-zinc-500">Fill in the credentials and save the user account.</p>
                </div>
                <button onClick={() => setShowUserModal(false)} className="text-zinc-400 hover:text-zinc-100 p-2 rounded-full"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAddOrUpdateUser} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-black block mb-1">Name</label>
                    <input value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className={`w-full border rounded-xl px-3 py-2 text-xs outline-none ${inputClass}`} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-black block mb-1">Email</label>
                    <input value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className={`w-full border rounded-xl px-3 py-2 text-xs outline-none ${inputClass}`} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-black block mb-1">Role</label>
                    <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} className={`w-full border rounded-xl px-3 py-2 text-xs outline-none ${inputClass}`}>
                      <option>Administrator</option>
                      <option>Parish Approver</option>
                      <option>Staff Requester</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="text-[10px] uppercase font-black block mb-1">Password</label>
                    <input value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} className={`w-full border rounded-xl px-3 py-2 text-xs outline-none ${inputClass}`} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-black block mb-1">Avatar</label>
                    <input value={userForm.avatar} onChange={(e) => setUserForm({ ...userForm, avatar: e.target.value })} className={`w-full border rounded-xl px-3 py-2 text-xs outline-none ${inputClass}`} />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="w-full px-5 py-3 rounded-2xl bg-[#00A859] text-white text-xs font-black">{userEditId ? 'Update User' : 'Create User'}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={`border rounded-3xl p-5 ${containerClass} print-only-section`}>
          <h3 className={`text-sm font-black mb-4 ${textHeadingClass}`}>Venue Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {venues.map((v) => (
              <div key={v.name} className={`p-3 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex justify-between"><p className="text-xs font-black">{v.name}</p><span className="text-[9px] font-black text-[#00A859]">{v.status}</span></div>
                <p className="text-[10px] text-zinc-500">Capacity: {v.capacity} people • {v.chapel ? 'Chapel restrictions apply' : 'General-purpose venue'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAvailability = () => {
    const visibleBookings = bookings
      .filter((b) => ['Approved', 'Pending', 'In Review'].includes(b.status))
      .filter((b) => availabilityVenue === 'All Venues' || b.venue === availabilityVenue);
    const groupedByDate = visibleBookings.reduce((acc, b) => {
      acc[b.date] = acc[b.date] || [];
      acc[b.date].push(b);
      return acc;
    }, {});

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h2 className={`text-2xl font-black ${textHeadingClass}`}>Venue Availability</h2>
            <p className={`text-xs ${textMutedClass}`}>View current bookings and available time slots (Read-only)</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setAvailabilityView('list')} className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 border ${availabilityView === 'list' ? 'bg-[#0F3B8C] border-[#0F3B8C] text-white' : theme === 'dark' ? 'border-zinc-800 text-zinc-400' : 'border-slate-200 text-slate-600'}`}><FileText className="w-4 h-4" /> List View</button>
            <button onClick={() => setAvailabilityView('calendar')} className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 border ${availabilityView === 'calendar' ? 'bg-[#0F3B8C] border-[#0F3B8C] text-white' : theme === 'dark' ? 'border-zinc-800 text-zinc-400' : 'border-slate-200 text-slate-600'}`}><Calendar className="w-4 h-4" /> Calendar View</button>
          </div>
        </div>

        <div className={`border rounded-3xl p-5 ${containerClass}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <label className={`text-[10px] uppercase font-black block mb-1 ${textMutedClass}`}>Select Venue</label>
              <select value={availabilityVenue} onChange={(e) => setAvailabilityVenue(e.target.value)} className={`border rounded-xl px-3 py-2 text-xs font-bold outline-none min-w-[240px] ${inputClass}`}>
                <option>All Venues</option>
                {venues.map((v) => <option key={v.name}>{v.name}</option>)}
              </select>
            </div>
            <button onClick={() => showToast('Venue schedule refreshed.', 'info')} className="px-4 py-2 rounded-xl text-xs font-black bg-[#00A859] text-white flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Refresh</button>
          </div>

          <div className="mb-4">
            <h3 className={`text-sm font-black ${textHeadingClass}`}>Schedule for {availabilityVenue}</h3>
            <p className={`text-[11px] ${textMutedClass}`}>{availabilityVenue === 'All Venues' ? 'All bookings across every venue' : 'Approved and pending records for the selected venue'}</p>
          </div>

          {availabilityView === 'list' ? (
            <div className="space-y-3">
              {visibleBookings.map((b) => (
                <div key={b.id} className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-mono font-black text-zinc-500">{b.id}</p>
                      <div className="mt-1">{getStatusBadge(b.status)}</div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className={`text-xs font-black ${textHeadingClass}`}>{b.purpose}</p>
                      <p className={`text-[11px] ${textMutedClass}`}>{b.venue}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-[11px]">
                    <div><p className="text-[9px] uppercase font-black text-zinc-500">Date</p><p className="font-bold">{b.date}</p></div>
                    <div><p className="text-[9px] uppercase font-black text-zinc-500">Time</p><p className="font-bold">{b.time}</p></div>
                    <div><p className="text-[9px] uppercase font-black text-zinc-500">Requested By</p><p className="font-bold">{b.requester}</p><p className="text-[10px] text-zinc-500">{b.requesterEmail}</p></div>
                    <div><p className="text-[9px] uppercase font-black text-zinc-500">Approved By</p><p className="font-bold">{b.status === 'Approved' ? b.priest : 'Pending Approval'}</p><p className="text-[10px] text-zinc-500">{b.approvalTimestamp || b.submittedAt}</p></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-[11px]">
                    <div><p className="text-[9px] uppercase font-black text-zinc-500">Attendees</p><p className="font-bold">{venues.find((v) => v.name === b.venue)?.capacity || 'N/A'} people capacity</p></div>
                    <div><p className="text-[9px] uppercase font-black text-zinc-500">DSR Note</p><p className={`${textMutedClass}`}>{getVenueAdvice(b.venue, b.eventType, b.ministry)[0]}</p></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Object.entries(groupedByDate).map(([date, items]) => (
                <div key={date} className={`rounded-2xl border p-4 ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <p className={`text-sm font-black ${textHeadingClass}`}>{date}</p>
                    <span className="text-[10px] font-black text-[#0F3B8C] dark:text-blue-300">{items.length} booking(s)</span>
                  </div>
                  <div className="space-y-2">
                    {items.map((b) => (
                      <div key={b.id} className={`rounded-xl p-3 border-l-4 ${b.status === 'Approved' ? 'border-[#00A859]' : 'border-[#B8860B]'} ${theme === 'dark' ? 'bg-zinc-950/60' : 'bg-white'}`}>
                        <p className="text-[10px] font-black truncate">{b.time}</p>
                        <p className={`text-[11px] font-bold truncate ${textHeadingClass}`}>{b.venue}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{b.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!visibleBookings.length && <div className="py-12 text-center text-zinc-500"><Calendar className="w-9 h-9 mx-auto mb-2" /><p className="text-xs font-black">No schedule records for this selection.</p></div>}

          <div className="mt-5 flex flex-wrap gap-3 text-[10px] text-zinc-500">
            <span className="text-[#00A859] font-bold">● Booked (Approved)</span>
            <span className="text-[#B8860B] dark:text-amber-300 font-bold">● Pending Approval</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${wrapperClass} selection:bg-[#00A859]/20 selection:text-[#00A859] flex flex-col justify-between transition-colors duration-300 relative`} style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'); * { font-family: 'Plus Jakarta Sans', sans-serif; }
        @media print {
          body.print-export-active * { display: none !important; }
          body.print-export-active #pdf-print-container, body.print-export-active #pdf-print-container * { display: block !important; }
          body.print-export-active #pdf-print-container { position: absolute; top: 0; left: 0; width: 100%; }
        }
      `}</style>
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-radial from-[#0F3B8C]/15 via-transparent to-transparent pointer-events-none -z-10 rounded-full blur-3xl"></div>
          <div className="absolute top-[300px] right-10 w-[400px] h-[400px] bg-radial from-[#00A859]/10 via-transparent to-transparent pointer-events-none -z-10 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className={`pointer-events-auto p-4 rounded-xl shadow-2xl border flex items-start gap-3 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-slate-200 shadow-lg text-slate-800'}`}>
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#00A859] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
            <div className="flex-1 text-xs font-semibold leading-relaxed">{toast.message}</div>
          </div>
        ))}
      </div>

      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 py-4 sm:px-6 transition-colors ${theme === 'dark' ? 'bg-[#030712]/80 border-zinc-900' : 'bg-white/85 border-slate-200'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {renderSeal()}
            <div className="min-w-0">
              <h1 className="flex items-center gap-2 text-sm font-bold tracking-wide"><span className={textHeadingClass}>San Pedro Cathedral</span><span className="rounded-full border border-[#00A859]/20 bg-[#00A859]/10 px-2 py-0.5 text-[10px] font-bold text-[#00A859]">DSR Live</span></h1>
              <p className="text-[10px] font-medium text-zinc-400">Venue & Facilities Management</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex sm:gap-4">
            <div className="relative flex items-center gap-1 rounded-xl border border-slate-200 bg-zinc-900/10 p-1 dark:border-zinc-850 dark:bg-zinc-800/40">
              <Languages className="mx-1 h-3.5 w-3.5 text-slate-400" />
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="cursor-pointer border-none bg-transparent pr-1 text-[11px] font-bold text-slate-700 outline-none dark:text-zinc-200">
                <option value="en" className="text-zinc-900">English</option>
                <option value="tl" className="text-zinc-900">Tagalog</option>
                <option value="ceb" className="text-zinc-900">Cebuano</option>
              </select>
            </div>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-xl border border-slate-200 bg-zinc-900/10 p-2 text-slate-500 hover:text-slate-800 dark:border-zinc-850 dark:bg-zinc-800/40 dark:text-zinc-400 dark:hover:text-white">
              {theme === 'dark' ? <Sun className="h-4 w-4 text-[#B8860B] dark:text-amber-300" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end text-xs"><span className={`font-bold ${textHeadingClass}`}>{currentUser?.name}</span><span className="text-[10px] uppercase tracking-wider text-[#B8860B] dark:text-[#FFD700] font-bold">{currentUser?.role}</span></div>
                <button onClick={handleLogout} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900/10 hover:text-red-500 dark:hover:bg-zinc-900"><LogOut className="h-4 w-4" /></button>
              </div>
            ) : <button onClick={() => { setShowLoginModal(true); setValidationErrors({}); }} className="rounded-full bg-[#0F3B8C] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1D4ED8]">{t('signIn')}</button>}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:hidden"
          >
            <span className="relative flex h-4 w-4 flex-col justify-between">
              <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-3 rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950/95 sm:hidden animate-fade-in">
            <div className="space-y-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-zinc-800 dark:bg-zinc-900/80">
                <label className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-zinc-500">Language</label>
                <select value={lang} onChange={(e) => { setLang(e.target.value); setMobileMenuOpen(false); }} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                  <option value="en">English</option>
                  <option value="tl">Tagalog</option>
                  <option value="ceb">Cebuano</option>
                </select>
              </div>

              <button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileMenuOpen(false); }} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-xs font-bold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100">
                <span>Theme</span>
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-slate-700" />}
              </button>

              {isLoggedIn ? (
                <>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100">
                    <p className="font-black">{currentUser?.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">{currentUser?.role}</p>
                  </div>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="flex w-full items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-3 py-2.5 text-left text-xs font-bold text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                    <span>Sign out</span>
                    <LogOut className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <button onClick={() => { setShowLoginModal(true); setValidationErrors({}); setMobileMenuOpen(false); }} className="w-full rounded-2xl bg-[#0F3B8C] px-4 py-2.5 text-xs font-black text-white hover:bg-[#1D4ED8]">{t('signIn')}</button>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 relative z-10">
        {!isLoggedIn ? (
          publicView === 'home' ? (
            <>
              {/* --- HOME / LANDING HERO (Luma-inspired) --- */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center pt-12 md:pt-20 min-h-[500px]">
            
            {/* Left Column Brand copy */}
            <div className="md:col-span-6 space-y-6 text-left animate-fade-in">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold ${
                theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-slate-100 border-slate-250 text-slate-700'
              }`}>
                <span className="w-2 h-2 rounded-full bg-[#00A859] animate-pulse"></span>
                Official Parish Office Board
              </div>

              <div className="space-y-4">
                <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none ${textHeadingClass}`} style={{ fontFamily: '"Playfair Display", serif' }}>
                  {t('heroTitleFirst')} <br />
                  <span className="bg-gradient-to-r from-[#FFD700] via-[#00A859] to-[#0F3B8C] bg-clip-text text-transparent">
                    {t('heroTitleSecond')}
                  </span>
                </h2>
                <p className={`text-sm md:text-base leading-relaxed max-w-lg font-medium ${textMutedClass}`}>
                  {t('heroSub')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button 
                  onClick={() => { setShowLoginModal(true); setValidationErrors({}); }}
                  className="px-6 py-3.5 rounded-xl bg-[#00A859] hover:bg-emerald-600 text-white font-extrabold text-sm shadow-xl hover:opacity-90 active:scale-95 transition-all"
                >
                  {t('createFirstEvent')}
                </button>
                <button 
                  type="button"
                  onClick={handleExploreFacilities}
                  className={`px-5 py-3.5 rounded-xl text-xs font-bold transition-all ${
                    theme === 'dark' ? 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t('exploreFacilities')} →
                </button>
              </div>
            </div>

            {/* Right Column Custom Phone/Card Mockup */}
            <div className="md:col-span-6 flex justify-center relative">
              
              {theme === 'dark' && (
                <div className="absolute inset-0 bg-radial from-[#0F3B8C]/20 to-transparent blur-3xl -z-10 rounded-full scale-110"></div>
              )}
              
              {/* Phone Glassmorphic Card Container */}
              <div className={`w-full max-w-[320px] rounded-[40px] border-4 p-5 relative overflow-hidden text-left aspect-[9/16] flex flex-col justify-between shadow-2xl transition-all ${
                theme === 'dark' ? 'border-zinc-800 bg-zinc-950/90' : 'border-slate-300 bg-white'
              }`}>
                
                {/* Top phone bar */}
                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold px-1">
                  <span>9:41</span>
                  <div className="w-18 h-4 bg-zinc-900/10 dark:bg-zinc-900 rounded-full border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-[8px] text-[#FFD700] font-black">
                    ⛪ San Pedro
                  </div>
                  <span>5G</span>
                </div>

                {/* Main Invitation Preview */}
                <div className="flex-1 flex flex-col justify-center py-6 space-y-4">
                  <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-[#0F3B8C] to-[#00A859] p-4 flex flex-col justify-end relative overflow-hidden shadow-md">
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-[8px] font-black text-white px-2 py-0.5 rounded-full">
                      DSR ACTIVE
                    </div>
                    <span className="text-[10px] uppercase font-bold text-amber-300">Wedding Liturgy</span>
                    <h4 className="text-sm font-black text-white leading-tight">Dela Cruz Nuptials</h4>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-600'}`}>Sanctuary Details</h3>
                    <div className={`space-y-1.5 text-[10px] ${textMutedClass}`}>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#00A859]" /> Main Cathedral Nave
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#FFD700]" /> June 15, 2026
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-blue-400" /> 09:00 AM - 11:30 AM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated interactive registration button */}
                <div className="space-y-2">
                  <button 
                    type="button"
                    onClick={() => { setShowLoginModal(true); setValidationErrors({}); }}
                    className="w-full py-2.5 rounded-xl bg-[#0F3B8C] hover:bg-[#1D4ED8] text-white font-bold text-xs text-center transition-all"
                  >
                    Authorize Portal Access
                  </button>
                  <p className="text-[8px] text-center text-zinc-500">San Pedro Cathedral Parish • Davao City</p>
                </div>

              </div>

            </div>

          </div>
            </>
          ) : renderExploreFacilitiesPage()
        ) : (
          <div className="space-y-6">
            <nav className="flex flex-wrap gap-2">
              {(isAdmin
                ? [['dashboard', 'Admin Statistics', Calendar], ['approvals', 'Approval Queue', Shield], ['reports', t('auditReports'), FileText], ['availability', t('availability'), Clock]]
                : isApprover
                  ? [['dashboard', 'Approval Queue', Shield], ['availability', t('availability'), Clock]]
                  : [['dashboard', 'My Request Center', User], ['availability', 'Check Venue Schedule', Clock]]
              ).map(([page, label, Icon]) => (
                <button key={page} onClick={() => setActivePage(page)} className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 border ${activePage === page ? 'bg-[#0F3B8C] border-[#0F3B8C] text-white' : theme === 'dark' ? 'border-zinc-800 text-zinc-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-slate-900'}`}><Icon className="w-4 h-4" /> {label}</button>
              ))}
            </nav>
            {activePage === 'dashboard' && renderDashboard()}
            {activePage === 'approvals' && renderApproverBoard()}
            {activePage === 'reports' && renderReports()}
            {activePage === 'availability' && renderAvailability()}
          </div>
        )}
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md">
          <div className="bg-[#121214] rounded-3xl border border-zinc-800 shadow-2xl max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px] animate-scale-up">
            
            {/* Left Box Preview Card (ENHANCED PARISH LOGO CREST AND HISTORIC BRAND) */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#0F3B8C] to-[#0d1e3d] p-8 flex flex-col justify-between relative border-r border-zinc-900 text-center">
              
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Top Subtitle */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">⛪</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">San Pedro Cathedral</span>
              </div>

              {/* Enhanced Interactive Vector Logo Container */}
              <div className="w-full max-w-[210px] mx-auto aspect-square bg-white rounded-full p-4 relative flex flex-col justify-center items-center shadow-2xl border-4 border-amber-400">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Outer Rings & Arch Text path */}
                  <path id="archTextPathTop" d="M 12 50 A 38 38 0 0 1 88 50" fill="none" />
                  <path id="archTextPathBottom" d="M 88 50 A 38 38 0 0 1 12 50" fill="none" />
                  
                  {/* Outer Typography */}
                  <text className="font-extrabold" fill="#00A859" fontSize="6.5" letterSpacing="0.4">
                    <textPath href="#archTextPathTop" startOffset="50%" textAnchor="middle">
                      SAN PEDRO CATHEDRAL PARISH
                    </textPath>
                  </text>
                  <text className="font-black" fill="#00A859" fontSize="8" letterSpacing="0.6">
                    <textPath href="#archTextPathBottom" startOffset="50%" textAnchor="middle">
                      DAVAO CITY
                    </textPath>
                  </text>

                  {/* Inner Blue Sky Disc */}
                  <circle cx="50" cy="50" r="30" fill="#3498DB" />
                  
                  {/* Cathedral Sketch Silhouette */}
                  <path d="M 32 68 L 32 50 L 38 42 L 50 28 L 62 42 L 68 50 L 68 68 Z" fill="#2980B9" opacity="0.4" />
                  <line x1="50" y1="28" x2="50" y2="20" stroke="#FFD700" strokeWidth="1.5" />
                  
                  {/* Golden vertical cross */}
                  <path d="M 50 22 L 50 65 M 44 32 L 56 32" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Intersecting Keys */}
                  {/* Gold Key */}
                  <path d="M 33 60 L 67 30 M 67 30 Q 70 27 74 31 Q 78 35 74 38 L 67 30" stroke="#FFD700" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Silver Key */}
                  <path d="M 67 60 L 33 30 M 33 30 Q 30 27 26 31 Q 22 35 26 38 L 33 30" stroke="#E5E7EB" strokeWidth="3.5" strokeLinecap="round" />

                  {/* Accents (Red Rubies on keys handles) */}
                  <circle cx="33" cy="60" r="2.5" fill="#E74C3C" />
                  <circle cx="67" cy="60" r="2.5" fill="#E74C3C" />
                  <circle cx="50" cy="45" r="2.5" fill="#E74C3C" />

                  {/* Arched banner Text "Since 1848" */}
                  <rect x="34" y="66" width="32" height="7" rx="2" fill="white" stroke="#2E86C1" strokeWidth="0.5" />
                  <text x="50" y="71.5" fill="#2E86C1" fontSize="4.5" fontWeight="900" textAnchor="middle">
                    Since 1848
                  </text>
                </svg>
              </div>

              {/* Bottom historic context */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-400">Archdiocese of Davao</p>
                <p className="text-[9px] text-zinc-400">Official scheduling gatekeeper interface</p>
              </div>
            </div>

            {/* Right Form Card Form */}
            <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
              <div className="max-w-sm w-full mx-auto space-y-6 text-left">
                
                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">Sign in as {loginRoleLabel}</h3>
                  <p className="text-xs text-zinc-400 mt-1">Use the selected access type to continue into the parish portal.</p>
                </div>

                {/* Core auth error banners */}
                {validationErrors.auth && (
                  <div className="p-3.5 bg-red-950/40 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-start gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="leading-relaxed font-semibold">{validationErrors.auth}</p>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  
                  {/* Email address field */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{t('emailLabel')}</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                      <input 
                        type="email" 
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(e.target.value);
                          if (validationErrors.email) setValidationErrors(prev => ({ ...prev, email: null }));
                        }}
                        placeholder="you@email.com"
                        className={`w-full bg-[#18181b] border ${
                          validationErrors.email ? 'border-red-500' : 'border-zinc-800 focus:border-zinc-500'
                        } rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-100 outline-none transition-all font-semibold`}
                      />
                    </div>
                    {validationErrors.email && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('passwordLabel')}</label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          if (validationErrors.password) setValidationErrors(prev => ({ ...prev, password: null }));
                        }}
                        placeholder="••••••••••••"
                        className={`w-full bg-[#18181b] border ${
                          validationErrors.password ? 'border-red-500' : 'border-zinc-800 focus:border-zinc-500'
                        } rounded-xl pl-10 pr-10 py-3 text-xs text-zinc-100 outline-none transition-all font-semibold`}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {validationErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Direct submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4.5 w-4.5 text-zinc-950" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <circle className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Verifying parish credentials...
                      </span>
                    ) : (
                      <span>Continue to Dashboard</span>
                    )}
                  </button>

                </form>

                {/* Access Type Selection */}
                <div className="space-y-2 pt-4 border-t border-zinc-900">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Choose sign-in access</span>

                  {[
                    { key: 'staff', label: 'Staff Login', subtitle: 'Requester / Staff access', icon: User, active: 'text-zinc-200', badge: 'bg-zinc-800' },
                    { key: 'approver', label: 'Approver Login', subtitle: 'Parish approval access', icon: Shield, active: 'text-emerald-200', badge: 'bg-emerald-950/60 border-emerald-800/50' },
                    { key: 'admin', label: 'Admin Login', subtitle: 'Administrator dashboard access', icon: Sparkles, active: 'text-amber-100', badge: 'bg-amber-500/10 border-amber-500/30' },
                  ].map(({ key, label, subtitle, icon: Icon, active, badge }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleRoleSelect(key)}
                      className={`w-full rounded-xl border p-3 text-left transition-all ${loginRole === key ? `border-[#00A859]/60 ${badge}` : 'border-zinc-800 bg-[#18181b] hover:bg-zinc-800'} ${active}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${loginRole === key ? 'text-[#00A859]' : 'text-zinc-400'}`} />
                          <span className="text-[11px] font-bold">{label}</span>
                        </div>
                        {loginRole === key && <span className="text-[10px] uppercase tracking-widest text-[#00A859] font-black">Selected</span>}
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">{subtitle}</p>
                    </button>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <button 
                    onClick={() => setShowLoginModal(false)}
                    className="text-xs text-zinc-500 hover:text-zinc-300 font-bold"
                  >
                    {t('closePortal')}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {isNewBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <div className="bg-[#121214] rounded-3xl border border-zinc-800 shadow-2xl max-w-3xl w-full overflow-hidden max-h-[92vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0F3B8C] to-[#00A859] text-white p-5 flex justify-between items-center border-b border-zinc-800">
              <div><h3 className="text-xs font-black tracking-widest uppercase flex items-center gap-2"><Calendar className="w-4 h-4 text-[#B8860B] dark:text-amber-300" /> {isEditingBooking ? 'Edit DSR Venue Request' : 'DSR Venue Request Form'}</h3><p className="text-[10px] text-zinc-200">Required fields, real signed-letter upload, priest dropdown, DSS validation, and duplicate detection are included.</p></div>
              <button onClick={() => {
                setIsNewBookingOpen(false);
                setIsEditingBooking(false);
                setEditingBookingId('');
              }} className="text-zinc-200 hover:text-white p-1 rounded-full hover:bg-zinc-900"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={(e) => handleCreateBooking(e, false)} className="p-6 space-y-4 text-left">
              <div className="p-4 rounded-2xl border bg-zinc-900 border-zinc-800">
                <p className="text-[10px] uppercase font-black text-[#FFD700] mb-1">Requester DSS Prompt</p>
                <p className="text-[11px] text-zinc-400">{form.date ? getMonthAdvice() : `Today is ${new Date().toLocaleString('en-US', { month: 'long' })}. If this is May, Flores de Mayo and daily catechism sessions may make Mezzanine Halls and Socio Hall busier than usual.`}</p>
                <ul className="text-[11px] text-zinc-400 mt-2 space-y-1">{getVenueAdvice().map((a) => <li key={a}>• {a}</li>)}</ul>
              </div>

              {validationErrors.duplicate && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{validationErrors.duplicate}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label={t('targetRoom')} error={validationErrors.venue}><select value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 outline-none">{venues.map((v) => <option key={v.name}>{v.name}</option>)}</select></Field>
                <Field label={t('ministry')} error={validationErrors.ministry}><select value={form.ministry} onChange={(e) => setForm({ ...form, ministry: e.target.value })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 outline-none">{MINISTRIES.map((m) => <option key={m}>{m}</option>)}</select></Field>
                <Field label={t('eventType')} error={validationErrors.eventType}><select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 outline-none">{EVENT_TYPES.map((ev) => <option key={ev}>{ev}</option>)}</select></Field>
                <Field label={t('priestApprover')} error={validationErrors.priest}><p className="text-[10px] text-zinc-500 mb-1">Select the priest/clergy name that will appear in the approval record.</p><select value={form.priest} onChange={(e) => setForm({ ...form, priest: e.target.value })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 outline-none">{PRIESTS.map((p) => <option key={p}>{p}</option>)}</select></Field>
                <Field label={t('reservationDate')} error={validationErrors.date}><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none" /></Field>
                <Field label={t('reservationTime')} error={validationErrors.time}><input type="text" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g., 09:00 AM - 11:30 AM" className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder:text-zinc-650 outline-none" /></Field>
              </div>

              <Field label={t('liturgicalPurpose')} error={validationErrors.purpose}><input type="text" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} placeholder="e.g., Flores de Mayo Catechism, Music Practice, Ministry Meeting" className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder:text-zinc-650 outline-none" /></Field>

              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-3">
                <Field label="Recurrence" error={validationErrors.recurrenceCount}>
                  <select value={form.recurrenceType} onChange={(e) => setForm({ ...form, recurrenceType: e.target.value, recurrenceCount: e.target.value === 'None' ? 1 : form.recurrenceCount })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none">
                    {['None', 'Daily', 'Weekly', 'Monthly'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </Field>
                <Field label="Occurrences" error={validationErrors.recurrenceCount}>
                  <input type="number" min="1" max="12" value={form.recurrenceCount} onChange={(e) => setForm({ ...form, recurrenceCount: Math.max(1, Math.min(12, Number(e.target.value))) })} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none" disabled={form.recurrenceType === 'None'} />
                </Field>
              </div>

              <div className="text-[10px] text-zinc-500 leading-relaxed">Select a recurrence schedule for repeat DSR entries. Use the same details for each occurrence and set a count up to 12.</div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Priority</label>
                <div className="grid grid-cols-3 gap-2">{['Low', 'Medium', 'High'].map((p) => <button key={p} type="button" onClick={() => setForm({ ...form, priority: p })} className={`py-2 rounded-xl text-xs font-bold border ${form.priority === p ? 'bg-white text-zinc-950 border-white' : 'bg-[#18181b] border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}>{p}</button>)}</div>
              </div>

              <Field label={t('requestNotes')}><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Input equipment needs, setup concerns, or other instructions..." rows={2} className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 placeholder:text-zinc-650 outline-none" /></Field>

              <div className={`p-4 rounded-2xl border ${form.hasLetter ? 'bg-[#00A859]/10 border-[#00A859]/30' : 'bg-red-500/10 border-red-500/20'}`}>
                <label className="block text-xs font-black text-zinc-100 mb-1">{t('signedLetter')} *</label>
                <p className="text-[10px] text-zinc-400 mb-3">Upload the signed request letter from the requester/ministry. The DSR cannot be submitted without this file.</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (form.signedLetterUrl) URL.revokeObjectURL(form.signedLetterUrl);
                    setForm({
                      ...form,
                      hasLetter: Boolean(file),
                      signedLetterName: file?.name || '',
                      signedLetterFile: file || null,
                      signedLetterUrl: file ? URL.createObjectURL(file) : '',
                    });
                  }}
                  className="block w-full text-[11px] text-zinc-300 file:mr-3 file:rounded-xl file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-bold file:text-zinc-950 hover:file:bg-zinc-100"
                />
                {form.signedLetterName && <p className="text-[10px] text-[#00A859] mt-2 font-bold">Attached: {form.signedLetterName}</p>}
                {validationErrors.hasLetter && <span className="block text-[10px] text-red-400 mt-2">{validationErrors.hasLetter}</span>}
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-zinc-900">
                <button type="button" onClick={() => setIsNewBookingOpen(false)} className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white">{t('cancel')}</button>
                <button type="button" onClick={(e) => handleCreateBooking(e, true)} className="px-5 py-2 rounded-xl bg-zinc-800 text-zinc-200 font-bold text-xs hover:bg-zinc-700">{t('saveDraft')}</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-100">{t('submitBooking')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className={`border-t py-8 px-6 ${theme === 'dark' ? 'bg-[#030712] border-zinc-900 text-zinc-400' : 'bg-white border-slate-250 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3"><span className="text-2xl">⛪</span><div className="text-left"><p className={`font-extrabold text-sm ${textHeadingClass}`}>San Pedro Cathedral Parish</p><p className="text-[10px] text-zinc-500 font-medium">Archdiocese of Davao • DSR Workflow Automation</p></div></div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500"><span className="text-emerald-500">Davao City © 2026</span></div>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
      {error && <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
    </div>
  );
}

export default App;
