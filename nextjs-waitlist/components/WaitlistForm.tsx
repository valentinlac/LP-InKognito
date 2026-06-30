'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';

type Country = { code: string; flag: string; name: string; dial: string; groups: number[] };
type FieldErrors = Partial<Record<'prenom' | 'email' | 'telephone' | 'form', string>>;
type Status = 'idle' | 'submitting' | 'success';

const COUNTRIES: Country[] = [
  { code: 'FR', flag: '🇫🇷', name: 'France',          dial: '+33',  groups: [1, 2, 2, 2, 2] },
  { code: 'BE', flag: '🇧🇪', name: 'Belgique',        dial: '+32',  groups: [3, 2, 2, 2]    },
  { code: 'CH', flag: '🇨🇭', name: 'Suisse',          dial: '+41',  groups: [2, 3, 2, 2]    },
  { code: 'LU', flag: '🇱🇺', name: 'Luxembourg',      dial: '+352', groups: [3, 3, 3]        },
  { code: 'MC', flag: '🇲🇨', name: 'Monaco',          dial: '+377', groups: [2, 2, 2, 2]    },
  { code: 'DE', flag: '🇩🇪', name: 'Allemagne',       dial: '+49',  groups: [3, 7]           },
  { code: 'ES', flag: '🇪🇸', name: 'Espagne',         dial: '+34',  groups: [3, 3, 3]        },
  { code: 'IT', flag: '🇮🇹', name: 'Italie',          dial: '+39',  groups: [3, 3, 4]        },
  { code: 'PT', flag: '🇵🇹', name: 'Portugal',        dial: '+351', groups: [3, 3, 3]        },
  { code: 'NL', flag: '🇳🇱', name: 'Pays-Bas',        dial: '+31',  groups: [1, 4, 4]        },
  { code: 'GB', flag: '🇬🇧', name: 'Royaume-Uni',     dial: '+44',  groups: [4, 6]           },
  { code: 'IE', flag: '🇮🇪', name: 'Irlande',         dial: '+353', groups: [2, 7]           },
  { code: 'US', flag: '🇺🇸', name: 'États-Unis',      dial: '+1',   groups: [3, 3, 4]        },
  { code: 'CA', flag: '🇨🇦', name: 'Canada',          dial: '+1',   groups: [3, 3, 4]        },
  { code: 'MA', flag: '🇲🇦', name: 'Maroc',           dial: '+212', groups: [1, 2, 2, 2, 2] },
  { code: 'DZ', flag: '🇩🇿', name: 'Algérie',         dial: '+213', groups: [1, 4, 4]        },
  { code: 'TN', flag: '🇹🇳', name: 'Tunisie',         dial: '+216', groups: [2, 3, 3]        },
  { code: 'SN', flag: '🇸🇳', name: 'Sénégal',         dial: '+221', groups: [2, 3, 2, 2]    },
  { code: 'CI', flag: '🇨🇮', name: "Côte d'Ivoire",   dial: '+225', groups: [2, 2, 2, 2, 2] },
  { code: 'CM', flag: '🇨🇲', name: 'Cameroun',        dial: '+237', groups: [1, 4, 4]        },
  { code: 'AU', flag: '🇦🇺', name: 'Australie',       dial: '+61',  groups: [3, 3, 3]        },
  { code: 'JP', flag: '🇯🇵', name: 'Japon',           dial: '+81',  groups: [2, 4, 4]        },
  { code: 'BR', flag: '🇧🇷', name: 'Brésil',          dial: '+55',  groups: [2, 5, 4]        },
];

const PLACEHOLDERS: Record<string, string> = {
  FR: '6 12 34 56 78', BE: '470 12 34 56', CH: '78 123 45 67',
  LU: '628 123 456',   MC: '06 12 34 56',  DE: '151 12345678',
  ES: '612 345 678',   IT: '312 345 6789', PT: '912 345 678',
  NL: '6 1234 5678',   GB: '7700 900123',  IE: '85 1234567',
  US: '202 555 0147',  CA: '416 555 0147', MA: '6 12 34 56 78',
  DZ: '5 6789 0123',   TN: '20 123 456',   SN: '77 123 45 67',
  CI: '07 12 34 56 78',CM: '6 7123 4567',  AU: '412 345 678',
  JP: '90 1234 5678',  BR: '11 91234 5678',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function countDigits(groups: number[]): number {
  return groups.reduce((s, g) => s + g, 0);
}

function formatPhone(raw: string, groups: number[]): string {
  const digits = raw.replace(/\D/g, '').slice(0, countDigits(groups));
  let out = '';
  let pos = 0;
  for (const g of groups) {
    if (pos >= digits.length) break;
    if (out) out += ' ';
    out += digits.slice(pos, pos + g);
    pos += g;
  }
  return out;
}

export default function WaitlistForm() {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [telephone, setTelephone] = useState('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value, country.groups);
    setTelephone(formatted);
    if (errors.telephone) setErrors(prev => ({ ...prev, telephone: undefined }));
  }

  function handleCountrySelect(c: Country) {
    setCountry(c);
    setTelephone('');
    setOpen(false);
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!prenom.trim()) next.prenom = 'Veuillez entrer votre prénom.';
    if (!email.trim()) next.email = 'Veuillez entrer votre email.';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Adresse email invalide.';
    if (!telephone.trim()) {
      next.telephone = 'Veuillez entrer votre numéro.';
    } else if (telephone.replace(/\D/g, '').length < countDigits(country.groups)) {
      next.telephone = 'Numéro de téléphone incomplet.';
    }
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus('submitting');
    const fullPhone = `${country.dial} ${telephone}`;
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: prenom.trim(),
          email: email.trim().toLowerCase(),
          telephone: fullPhone,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean; error?: string; field?: 'prenom' | 'email' | 'telephone';
      };

      if (!res.ok || !data.ok) {
        setStatus('idle');
        if (data.field && data.error) setErrors({ [data.field]: data.error });
        else setErrors({ form: data.error || 'Une erreur est survenue. Réessayez.' });
        return;
      }

      setStatus('success');
    } catch (err) {
      console.error('[waitlist-form] submit failed', err);
      setStatus('idle');
      setErrors({ form: 'Connexion impossible. Vérifiez votre réseau.' });
    }
  }

  if (status === 'success') {
    return (
      <div className="waitlist-success" role="status" aria-live="polite">
        <div className="waitlist-success-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#22d87f" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 12 10 18 20 6" />
          </svg>
        </div>
        <h3 className="waitlist-success-h">Bienvenue dans la bêta.</h3>
        <p className="waitlist-success-p">
          Merci {prenom.trim()}. On revient vers vous très vite avec votre accès et les prochaines étapes.
        </p>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form className="waitlist-form" onSubmit={handleSubmit} noValidate>

      {/* Prénom */}
      <div className="waitlist-field">
        <label className="waitlist-label" htmlFor="wl-prenom">
          Prénom <span className="waitlist-required">●</span>
        </label>
        <input
          id="wl-prenom" name="prenom" type="text" autoComplete="given-name"
          placeholder="Jean" value={prenom}
          onChange={(e) => {
            setPrenom(e.target.value);
            if (errors.prenom) setErrors(prev => ({ ...prev, prenom: undefined }));
          }}
          className={`waitlist-input${errors.prenom ? ' is-invalid' : ''}`}
          disabled={submitting} required
          aria-invalid={!!errors.prenom}
          aria-describedby={errors.prenom ? 'wl-prenom-err' : undefined}
        />
        {errors.prenom && <span id="wl-prenom-err" className="waitlist-error">{errors.prenom}</span>}
      </div>

      {/* Téléphone */}
      <div className="waitlist-field">
        <label className="waitlist-label" htmlFor="wl-telephone">
          Numéro de téléphone <span className="waitlist-required">●</span>
        </label>
        <div
          className={`phone-wrapper${errors.telephone ? ' is-invalid' : ''}`}
          ref={wrapperRef}
        >
          <button
            type="button"
            className="country-btn"
            onClick={() => setOpen(o => !o)}
            disabled={submitting}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Pays : ${country.name} (${country.dial})`}
          >
            <span className="country-flag">{country.flag}</span>
            <span className="country-dial">{country.dial}</span>
            <svg className={`country-chevron${open ? ' is-open' : ''}`} viewBox="0 0 10 6" width="9" height="9" fill="none" aria-hidden="true">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="phone-sep" aria-hidden="true" />

          <input
            id="wl-telephone" name="telephone"
            type="tel" inputMode="numeric" autoComplete="tel-national"
            placeholder={PLACEHOLDERS[country.code] ?? ''}
            value={telephone}
            onChange={handlePhoneChange}
            className="phone-input"
            disabled={submitting} required
            aria-invalid={!!errors.telephone}
            aria-describedby={errors.telephone ? 'wl-telephone-err' : undefined}
          />

          {open && (
            <div className="country-dropdown" role="listbox" aria-label="Sélectionner le pays">
              {COUNTRIES.map(c => (
                <button
                  key={c.code} type="button" role="option"
                  aria-selected={c.code === country.code}
                  className={`country-option${c.code === country.code ? ' is-active' : ''}`}
                  onClick={() => handleCountrySelect(c)}
                >
                  <span className="country-flag">{c.flag}</span>
                  <span className="country-option-name">{c.name}</span>
                  <span className="country-option-dial">{c.dial}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.telephone && <span id="wl-telephone-err" className="waitlist-error">{errors.telephone}</span>}
      </div>

      {/* Email */}
      <div className="waitlist-field">
        <label className="waitlist-label" htmlFor="wl-email">
          Email <span className="waitlist-required">●</span>
        </label>
        <input
          id="wl-email" name="email" type="email" autoComplete="email"
          placeholder="vous@exemple.com" value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
          }}
          className={`waitlist-input${errors.email ? ' is-invalid' : ''}`}
          disabled={submitting} required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'wl-email-err' : undefined}
        />
        {errors.email && <span id="wl-email-err" className="waitlist-error">{errors.email}</span>}
      </div>

      {errors.form && (
        <div className="waitlist-form-error" role="alert">{errors.form}</div>
      )}

      <button type="submit" className="waitlist-submit" disabled={submitting}>
        {submitting ? 'Envoi…' : 'Rejoindre la waitlist'}
      </button>
    </form>
  );
}
