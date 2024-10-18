import React, { useState, useEffect } from "react";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/styles";
import {
  BUTTONSET_HEADING,
  BUTTONSET_WAY_TO_CONTACT,
} from "../../utils/constants";
import ButtonsetItemWayToContact from "../ButtonsetItemWayToContact/ButtonsetItemWayToContact";
import { labelTop } from "../../utils/helpers/LabelTop";

function WayToContact() {
  const [phone, setPhone] = useState("");
  const [valueChange, setValueChange] = useState("");
  const [email, setEmail] = useState("");
  const [phoneInitialized, setPhoneInitialized] = useState(false);

  useEffect(() => {
    const defaultChecked = BUTTONSET_WAY_TO_CONTACT.find(
      (item) => item.checked,
    );
    if (defaultChecked) {
      setValueChange(defaultChecked.value);
    }
  }, []);

  useEffect(() => {
    setPhone("");
    setEmail("");

    const emailInput = document.querySelector(".email-input");
    const phoneInput = document.querySelector(".iti__tel-input");

    if (emailInput) {
      setPhoneInitialized(false);
      labelTop(
        emailInput,
        "label-in-focus__email",
        "email",
        "Email address*",
        "Email address*",
        "delete-button__email",
      );
    }

    if (phoneInput && !phoneInitialized) {
      setPhoneInitialized(true);
      labelTop(
        phoneInput,
        "label-in-focus__phone",
        "phoneNumber",
        "Phone number*",
        "Phone number*",
        "delete-button__phone",
      );
    }
  }, [valueChange]);

  useEffect(() => {
    if (phoneInitialized) {
      const cleanup = initializeCountrySearch();
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, [phoneInitialized, valueChange]);

  const initializeCountrySearch = () => {
    const existingWrapper = document.querySelector(".country-search-wrapper");
    if (existingWrapper) {
      return; // Если уже есть обертка, не добавляем новую
    }

    const searchInput = document.querySelector(".iti__search-input");
    let deleteButton;
    let clonedSearchInput;
    let label;
    let search;
    let inputNumber;
    let buttonFlagCountry;

    if (searchInput) {
      const wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add("country-search-wrapper");

      deleteButton = document.createElement("div");
      deleteButton.classList.add("delete-button");
      search = document.createElement("div");
      search.classList.add("country-search-wrapper_image");

      clonedSearchInput = searchInput.cloneNode(true);
      clonedSearchInput.setAttribute("id", "country-search-wrapper_input");
      clonedSearchInput.setAttribute("autocomplete", "off");
      clonedSearchInput.value = "";

      wrapperDiv.appendChild(clonedSearchInput);
      wrapperDiv.appendChild(deleteButton);
      wrapperDiv.appendChild(search);

      searchInput.parentNode.insertBefore(wrapperDiv, searchInput);
      searchInput.remove();

      // Обработчик клика на обертку
      wrapperDiv.addEventListener("click", (event) => {
        event.stopPropagation();
        setTimeout(() => {
          clonedSearchInput.focus();
        }, 0);
      });

      // Логика label
      clonedSearchInput.addEventListener("focus", () => {
        if (!label) {
          label = document.createElement("label");
          label.setAttribute("for", "country-search-wrapper_input");
          label.textContent = "Country";
          label.classList.add("country-search-wrapper_label");
          wrapperDiv.insertBefore(label, clonedSearchInput);
        }
        clonedSearchInput.setAttribute("placeholder", "");
      });

      clonedSearchInput.addEventListener("blur", () => {
        if (label) {
          label.remove();
          label = null;
          clonedSearchInput.setAttribute("placeholder", "Country");
        }
      });

      // Обработчик кнопки очистки
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        clonedSearchInput.value = "";
        if (label) {
          label.remove();
          label = null;
        }
      });

      clonedSearchInput.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      clonedSearchInput.addEventListener("input", () => {
        const searchValue = clonedSearchInput.value.toLowerCase();
        const countryItems = document.querySelectorAll(".iti__country");
        countryItems.forEach((item) => {
          const countryName = item
            .querySelector(".iti__country-name")
            .textContent.toLowerCase();
          item.style.display = countryName.includes(searchValue) ? "" : "none";
        });
      });

      const buttonFlagCountry = document.querySelector(
        ".iti__selected-country",
      );
      const inputNumber = document.querySelector(".iti__tel-input");

      document.addEventListener("click", function (event) {
        const dropdown = document.querySelector(".iti__dropdown");
        if (
          buttonFlagCountry &&
          !buttonFlagCountry.contains(event.target) &&
          (!dropdown || !dropdown.contains(event.target))
        ) {
          buttonFlagCountry.blur();
          buttonFlagCountry.classList.remove("iti__selected-country__focus");
        }
      });

      if (buttonFlagCountry) {
        const countryItems = document.querySelectorAll(".iti__country");

        countryItems.forEach((item) => {
          item.addEventListener("click", () => {
            buttonFlagCountry.classList.remove("iti__selected-country__focus");
            buttonFlagCountry.blur();
          });
        });

        buttonFlagCountry.addEventListener("click", () => {
          const dropdown = document.querySelector(".iti__dropdown");
          if (dropdown && clonedSearchInput.value !== "") {
            clonedSearchInput.focus();
          }
        });
      }

      if (inputNumber && buttonFlagCountry) {
        inputNumber.addEventListener("click", () => {
          buttonFlagCountry.classList.remove("iti__selected-country__focus");
        });

        buttonFlagCountry.addEventListener("click", () => {
          buttonFlagCountry.classList.toggle("iti__selected-country__focus");
        });
      } else {
        console.error(
          "Element with class .iti__tel-input or .iti__selected-country not found",
        );
      }
    } else {
      console.error("Element with class .iti__search-input not found");
    }

    // Удаление обработчиков событий при размонтировании
    return () => {
      if (inputNumber) {
        inputNumber.removeEventListener("click", () => {});
      }
      if (buttonFlagCountry) {
        buttonFlagCountry.removeEventListener("click", () => {});
      }
      if (deleteButton) {
        deleteButton.removeEventListener("click", () => {});
      }
      if (clonedSearchInput) {
        clonedSearchInput.removeEventListener("click", () => {});
        clonedSearchInput.removeEventListener("focus", () => {});
        clonedSearchInput.removeEventListener("blur", () => {});
        clonedSearchInput.removeEventListener("input", () => {});
      }
      document.removeEventListener("click", () => {});
    };
  };

  return (
    <div className="way-to-contact-block">
      <h2 className="way-to-contact-block_heading">{BUTTONSET_HEADING}</h2>
      <div className="way-to-contact-block_buttonset">
        {BUTTONSET_WAY_TO_CONTACT.map((item, i) => {
          const nextValue = BUTTONSET_WAY_TO_CONTACT[i + 1]?.value;
          return (
            <ButtonsetItemWayToContact
              key={item.title}
              value={item.value}
              valueChange={valueChange}
              changeValue={(e) => setValueChange(e.target.value)}
              title={item.title}
              nextValue={nextValue}
            />
          );
        })}
      </div>
      {valueChange !== "email" ? (
        <div>
          <IntlTelInput
            required={true}
            value={phone}
            onChangeNumber={setPhone}
            initOptions={{
              initialCountry: "auto",
              containerClass: "way-to-contact-block_inputFlag",
              strictMode: "true",
              nationalMode: "true",
              separateDialCode: "true",
              customPlaceholder: () => {
                return "Phone number*";
              },
              geoIpLookup: function (success, failure) {
                fetch("https://ipapi.co/json")
                  .then(function (res) {
                    return res.json();
                  })
                  .then(function (data) {
                    success(data.country_code);
                  })
                  .catch(function () {
                    failure();
                  });
              },
              i18n: {
                searchPlaceholder: "Country",
              },
            }}
          />
        </div>
      ) : (
        <input
          id={"email"}
          className={"email-input"}
          type="email"
          placeholder="Email address*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
    </div>
  );
}

export default WayToContact;
