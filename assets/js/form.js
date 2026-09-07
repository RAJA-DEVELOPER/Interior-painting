/**
 * RENOVA — Form Validation
 * Full validation with error states, success handling, and loading states
 */

'use strict';

// ──────────────────────────────────────────────────────────
// VALIDATION HELPERS
// ──────────────────────────────────────────────────────────
const isRequired = (val) => val.trim() !== '';
const isEmail    = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
const isPhone    = (val) => /^[+\d\s\-().]{7,16}$/.test(val.trim());
const isMinLen   = (val, min) => val.trim().length >= min;

const rules = {
  name:    [(v) => isRequired(v),       'Name is required'],
  email:   [(v) => isEmail(v),          'Please enter a valid email address'],
  phone:   [(v) => !v || isPhone(v),    'Please enter a valid phone number'],
  message: [(v) => isMinLen(v, 15),     'Message must be at least 15 characters'],
  service: [(v) => isRequired(v),       'Please select a service'],
  subject: [(v) => isRequired(v),       'Subject is required'],
};

const validate = (input) => {
  const name  = input.name || input.id;
  const value = input.value;
  const rule  = rules[name];
  if (!rule) return { valid: true };

  const [test, msg] = rule;
  const valid = test(value);
  return { valid, msg: valid ? '' : msg };
};

// ──────────────────────────────────────────────────────────
// FIELD FEEDBACK
// ──────────────────────────────────────────────────────────
const showError = (input, message) => {
  const group = input.closest('.form-group');
  if (!group) return;
  group.classList.add('has-error');
  input.classList.add('error');
  const err = group.querySelector('.form-error');
  if (err) err.textContent = message;
};

const clearError = (input) => {
  const group = input.closest('.form-group');
  if (!group) return;
  group.classList.remove('has-error');
  input.classList.remove('error');
};

// ──────────────────────────────────────────────────────────
// FORM VALIDATION INIT
// ──────────────────────────────────────────────────────────
const initForm = (form) => {
  if (!form) return;

  const inputs = [...form.querySelectorAll('input, select, textarea')].filter(
    el => el.name || el.id
  );

  // Live validation on blur
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      const { valid, msg } = validate(input);
      if (!valid) showError(input, msg);
      else clearError(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        const { valid, msg } = validate(input);
        if (valid) clearError(input);
        else showError(input, msg);
      }
    });
  });

  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let hasError = false;

    inputs.forEach(input => {
      const { valid, msg } = validate(input);
      if (!valid) {
        showError(input, msg);
        hasError = true;
      } else {
        clearError(input);
      }
    });

    if (hasError) {
      const firstError = form.querySelector('.form-input.error, .form-select.error, .form-textarea.error');
      firstError?.focus();
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="loading-dots"><span></span><span></span><span></span></span>`;

      // Simulate async submit
      await new Promise(resolve => setTimeout(resolve, 1600));

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }

    // Success state
    showFormSuccess(form);
  });
};

const showFormSuccess = (form) => {
  const successEl = document.createElement('div');
  successEl.className = 'form-success';
  successEl.innerHTML = `
    <div class="form-success__icon">✓</div>
    <h3 class="form-success__title">Message Sent!</h3>
    <p class="form-success__text">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
  `;

  successEl.style.cssText = `
    text-align: center;
    padding: 48px 24px;
    animation: fadeUp 0.5s ease both;
  `;
  successEl.querySelector('.form-success__icon').style.cssText = `
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(184,106,85,0.12); color: var(--ac);
    font-size: 28px; display: flex; align-items: center;
    justify-content: center; margin: 0 auto 20px;
  `;
  successEl.querySelector('.form-success__title').style.cssText = `
    font-family: var(--serif); font-size: 1.75rem;
    color: var(--tx-1); margin-bottom: 12px;
  `;
  successEl.querySelector('.form-success__text').style.cssText = `
    font-size: 0.9375rem; color: var(--tx-3); line-height: 1.7;
    margin-inline: auto;
  `;

  form.style.transition = 'opacity 0.3s ease';
  form.style.opacity = '0';
  setTimeout(() => {
    form.replaceWith(successEl);
  }, 300);
};

// ──────────────────────────────────────────────────────────
// INIT ALL FORMS
// ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    initForm(form);
  });
});
